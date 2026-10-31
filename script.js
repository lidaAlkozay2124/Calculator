const screen = document.getElementById('screen');
const numButtons = document.querySelectorAll('.num');
const opButtons = document.querySelectorAll('.buttons button.operator:not(#btn-del):not(#btn-ac)');

// مدیریت ورود اعداد و ممیز به صورت پویا با رویدادها
numButtons.forEach(button => {
    button.addEventListener('click', () => {
        const val = button.innerText;
        if (screen.value === '0' && val !== '.') {
            screen.value = val;
        } else {
            screen.value += val;
        }
    });
});

// مدیریت کاراکترهای محاسباتی ریاضی (+ - * / %)
opButtons.forEach(button => {
    button.addEventListener('click', () => {
        const val = button.innerText;
        screen.value += val;
    });
});

// پاک کردن کامل صفحه با کلیک روی AC
document.getElementById('btn-ac').addEventListener('click', () => {
    screen.value = '0';
});

// حذف یک کاراکتر با دکمه DEL
document.getElementById('btn-del').addEventListener('click', () => {
    if (screen.value.length > 1) {
        screen.value = screen.value.slice(0, -1);
    } else {
        screen.value = '0';
    }
});

// محاسبه نهایی با منطق داخلی جاوا اسکریپت به هنگام زدن =
document.getElementById('btn-equal').addEventListener('click', () => {
    try {
        let expression = screen.value;
        // ارزیابی عبارت به صورت امن
        let result = Function('"use strict";return (' + expression + ')')();
        screen.value = result;
    } catch (error) {
        screen.value = 'Error';
        setTimeout(() => { screen.value = '0'; }, 1500);
    }
});