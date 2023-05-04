const xml = `<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>`;
// преобразование XML в JS-объект
const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xml, "text/xml");
const students = xmlDoc.getElementsByTagName("student");
const result = {
    list: []
};
for (let i = 0; i < students.length; i++) {
    const name = students[i].getElementsByTagName("name")[0];
    const firstName = name.getElementsByTagName("first")[0].textContent;
    const secondName = name.getElementsByTagName("second")[0].textContent;
    const fullName = `${firstName} ${secondName}`; // добавляем кавычки для правильного объединения строк
    const age = parseInt(students[i].getElementsByTagName("age")[0].textContent);
    const prof = students[i].getElementsByTagName("prof")[0].textContent;
    const lang = name.getAttribute("lang");
    result.list.push({
        name: fullName,
        age: age,
        prof: prof,
        lang: lang
    });
}
// вывод в консоль
console.log(result);