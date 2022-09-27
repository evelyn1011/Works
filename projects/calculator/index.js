let num = document.querySelectorAll(".num")
let operater = document.querySelectorAll(".operater")

let backspace = document.getElementsByClassName("backspace")[0]
let clear = document.getElementsByClassName("clear")[0]
let inverse = document.getElementsByClassName("inverse")[0]
let dot = document.getElementsByClassName("dot")[0]
let equ = document.getElementsByClassName("equ")[0]

let display = document.getElementsByClassName("display")[0]
let output = document.getElementsByClassName("output")[0]

// 计算结果函数
function calculate(str) {
  for (let i = 0; i < str.length; i++) {
    if (str[i] == "×") {
      str = str.substring(0, i) + "*" + str.substring(i + 1, str.length)
    }
  }
  for (let i = 0; i < str.length; i++) {
    if (str[i] == "÷") {
      str = str.substring(0, i) + "/" + str.substring(i + 1, str.length)
    }
  }
  return new Function(`return ${str}`)()
}

// 清除显示器
clear.onclick = function () {
  display.textContent = ""
  output.textContent = ""
}

// 取反
inverse.onclick = function () {
  let str = display.textContent;
  let label = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    if ("+-×÷".includes(str[i])) {
      if (str[i] !== "-") {
        // 无减号
        display.textContent = str.substring(0, i + 1) + "-" + str.substring(i + 1, str.length)
      } else if ("+-×÷".includes(str[i - 1]) || i - 1 < 0) {
        // 前面有他运算符 或 只有一个数字 => 直接去掉减号
        display.textContent = str.substring(0, i) + str.substring(i + 1, str.length)
      } else {
        // 前面无他运算符 => 改成+
        display.textContent = str.substring(0, i) + "+" + str.substring(i + 1, str.length);
      }
      label = 1;
      break;
    }
  }
  if (!label) {
    // 仅含一个数字
    display.textContent = "-" + str;
  }
  output.textContent = calculate(display.textContent)
}

// 删除
backspace.onclick = function () {
  let str = display.textContent
  display.textContent = str.substring(0, str.length - 1)
  if (!"+-×÷".includes(display.textContent[display.textContent.length - 1])) {
    output.textContent = calculate(display.textContent);
  } else {
    output.textContent = "";
  }
}

// 运算符点击事件
operater.forEach(function (item) {
  item.onclick = function () {
    let str = display.textContent
    if (".".includes(str[str.length - 1]) && "+-×÷".includes(str[str.length - 2])) {
      alert("小数错误输入！")
    } else if (str != "" && !"+-×÷".includes(str[str.length - 1])) {
      // 添加运算符
      display.textContent = str + item.textContent
      console.log(display.textContent, "符号", 222)
    } else if (str != "" && "+-×÷".includes(str[str.length - 1])) {
      // 切换其他运算
      display.textContent = str.substring(0, str.length - 1) + item.textContent;
    }
  }

})

// 数字点击事件
num.forEach(function (item) {
  item.onclick = function () {
    display.textContent += item.textContent;
    console.log(display.textContent, "数字")
    let str = display.textContent;
    for (let i = 0; i < str.length; i++) {
      if ("+-×÷".includes(str[i])) {
        output.textContent = calculate(str)
        break;
      }
    }
  }
})

dot.onclick = function () {
  let str = display.textContent;
  let label = 0
  for (let i = str.length - 1; i > -1; i--) {
    if ("+-×÷".includes(str[i])) {
      label = 1 + i;
      break;
    }
  }
  if (!str.substring(label, str.length).includes(".")) {
    display.textContent += "."
  }

}

equ.onclick = function () {
  let str = display.textContent
  console.log("+-×÷".includes(str[str.length - 1]))
  if (!"+-×÷".includes(str[str.length - 1])) {
    display.textContent = output.textContent;
    output.textContent = "";
  }
}