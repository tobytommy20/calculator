document.addEventListener("keydown", (e) => {
  const display = document.querySelector('input[name="display"]');

  if (!display) return;

  e.preventDefault();

  if (/[0-9+\-*/.%]/.test(e.key)) display.value += e.key;

  if (e.key === "Enter") {
    e.preventDefault(); 
    try {
      display.value = eval(display.value);
    } catch {
      display.value = "Error";
    }
  }
  if (e.key === "Backspace") {
    e.preventDefault(); 
    display.value = display.value.slice(0, -1);
  }
});
