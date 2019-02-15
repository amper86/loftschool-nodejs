// Копирует и сортирует файлы
// node index [папка откуда копирем] [папка куда копируем]
// пути до папок относительно index.js

const fs = require('fs');
const path = require('path');

const filenames = process.argv.slice(2);
const src = path.join(__dirname, filenames[0]);
const to = path.join(__dirname, filenames[1]);

/* console.log('получаем аргументы из командной строки: ' + filenames);
console.log('берем из: ' + src);
console.log('записываем в: ' + to); */

fs.mkdir(to, { recursive: true }, err => {
  if (err) {
    console.error('Папка не создана');
    throw err;
  } else {
    // console.log('папка создана по пути ' + to);
    readDir(src);
    console.log('Копирование и сортировка файлов завершена!');
  }
});

const readDir = (src) => {
  const files = fs.readdirSync(src);
  // console.log(files);

  files.forEach(item => {
    let localBase = path.join(src, item);
    let state = fs.statSync(localBase);

    if (state.isDirectory()) {
      // console.log('folder ' + item);
      readDir(localBase);
    } else {
      // console.log('file ' + item);
      createFolder(item, localBase);
    }
  });
};

const createFolder = (file, srcPath) => {
  const capitalLetter = file[0].toUpperCase();
  const currentPath = path.join(to, capitalLetter);

  if (!fs.existsSync(currentPath)) {
    fs.mkdir(currentPath, { recursive: true }, err => {
      if (err) {
        console.error('папка с нужной буквой не создалась!');
        throw err;
      }
    });
  }

  copyFile(file, currentPath, srcPath);
};

const copyFile = (file, destPath, srcPath) => {
  // если файл с таким именем есть то добавляет -new к названию
  // не работает если файлов с одинаковым именем больше двух
  if (fs.existsSync(path.join(destPath, file))) {
    const nameFile = file.split('.');
    const newFile = [nameFile[0] + '-new', nameFile[1]].join('.');
    const dest = path.join(destPath, newFile);

    fs.copyFile(srcPath, dest, (err) => {
      if (err) {
        console.error('во время копирования что то пошло не так(');
        throw err;
      }
    });
  } else {
    fs.copyFile(srcPath, path.join(destPath, file), (err) => {
      if (err) {
        console.error('во время копирования что то пошло не так(');
        throw err;
      }
    });
  }
};
