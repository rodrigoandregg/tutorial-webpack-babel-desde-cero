# Configurar Webpack y babel desde cero

Con este tutorial aprenderás, paso a paso, a configurar Webpack 5 y Babel 7 desde cero, para gestionar tus archivos JSX, CSS y SCSS, y convertir tu código JavaScript moderno en una versión compatible con los navegadores más antiguos.

El tutorial cubre los conceptos básicos de Webpack, como la optimización del código, la gestión de dependencias y la creación de un flujo de trabajo eficiente para proyectos modernos. También aprenderás a integrar herramientas como Prettier, para mantener un formato consistente en el código, y ESLint, para asegurarte de que tu código siga buenas prácticas y esté libre de errores.

Al final de este tutorial, habrás configurado un entorno de desarrollo con Webpack y Babel, listo para usar en tus propios proyectos, con una estructura optimizada y mejores prácticas implementadas.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

- [Node.js](https://nodejs.org/) (versión recomendada: Node 18+)
- Un editor de código, de preferencia [Visual Studio Code](https://code.visualstudio.com/).
- Conocimientos básicos de la terminal y Git.

## Organización de carpetas y archivos necesarios

A lo largo del tutorial iremos creando distintos archivos y directorios/carpetas. Pero si tú quieres, nadie te detiene de adelantarte y crearlos todos de un tirón.

> Nota: El archivo de licencia es totalmente opcional.

```
tu-proyecto/
├── webpack/
│   ├── webpack.common.js
│   ├── webpack.dev.js
│   └── webpack.prod.js
├── public/
│   ├── assets/
│   ├── images/
│   ├── fonts/
│   └── index.html
├── src/
│   ├── components/
│   ├── styles/
│   │   ├── css/
│   │   └── sass/
│   │       ├── index.scss
│   │       └── App.scss
│   ├── index.jsx
│   └── App.jsx
├── .eslintignore
├── .gitignore
├── .prettierignore
├── .prettierrc
├── babel.config.json
├── README.md
└── LICENSE
```

## 📌 ¿Por qué instalamos Prettier y ESLint, y creamos archivos de configuración para ambos?

Tanto **Prettier** como **ESLint** son herramientas esenciales para mantener un código limpio, consistente y libre de errores. Usarlas correctamente dentro de un proyecto es crucial, especialmente cuando trabajamos en equipo.

Te explico por qué preferimos instalar estas herramientas como dependencias del proyecto y no confiar solo en las extensiones de los editores.

> 👀 Ojo!
>
> No es obligatorio seguir esta filosofía, ya que, aunque tengas instaladas las extensiones de **Prettier** y **ESlint**, sus archivos de configuración siempre se antepondrán a las configuraciones de las extensiones dentro de las opciones del editor.
>
> Pero si tu extensión tiene una opción extra, que no está en el archivo de configuración de **prettier** o **eslint**, esta se aplicará de todas formas.

### 🛠 Instalación de Prettier y ESLint

En lugar de depender de las extensiones del editor para formatear el código y comprobar posibles errores, instalamos **Prettier** y **ESLint** directamente en el proyecto y creamos archivos de configuración específicos para ambos.

¿no te ha pasado que clonas un repositorio y, al momento de formatearlo con **Prettier** y hacer un commit, tu archivo ya no coincide en nada con el original a pesar de que solo agregaste unas cuantas líneas?

Pues al instalar **Prettier** y **ESLint** como dependencias, todos los miembros del equipo tendrán la misma versión de estas herramientas. Esto garantiza que el código se formatee y valide de manera uniforme, sin importar qué editor o entorno estén utilizando.

Tanto **Prettier** como **ESLint** tienen configuraciones personalizables que definimos en archivos específicos dentro del proyecto. Esto nos permite:

**Configuración compartida**: Estos archivos de configuración se incluyen en el repositorio, lo que garantiza que todos los miembros del equipo estén utilizando las mismas reglas de formato y validación. Así, el equipo no depende de configuraciones locales de los editores.

**Mejor control sobre las reglas**: Puedes ajustar las reglas de formateo y validación según las necesidades del proyecto. Por ejemplo, puedes definir que **Prettier** use comillas simples en lugar de dobles, o que **ESLint** permita ciertos tipos de código que otros linters pueden marcar como errores.

### 🚫 ¿Por qué no usar solo extensiones del editor?

Aunque las extensiones de **Prettier** y **ESLint** en editores como VSCode son útiles, confiamos en que instalar las herramientas directamente en el proyecto nos da un control mucho mayor sobre cómo se formatea y valida el código. Las extensiones pueden llevar a inconsistencias en equipos debido a los siguientes motivos:

**Diferentes versiones**: Si cada miembro del equipo usa su propia configuración o versión de las herramientas mediante extensiones, es probable que no tengan el mismo comportamiento, lo que puede generar diferencias en el formateo del código y hasta en los resultados de las validaciones. Esto es particularmente problemático cuando alguien formatea el código en su editor local sin que se ejecute el mismo conjunto de reglas en todos los entornos de desarrollo.

**Confusión en los pull requests**: Si alguien formatea el código con su extensión local sin las mismas reglas de Prettier o ESLint que el resto del equipo, puede ocurrir que un archivo se vea completamente diferente solo por el formato. Esto puede hacer que un pull request sea más difícil de revisar y aumentar la probabilidad de errores en el código. Básicamente lo que te decía antes.

**Falta de estandarización**: Usar solo extensiones no garantiza que todos los desarrolladores sigan el mismo estilo de código. Si un miembro del equipo tiene configuraciones personalizadas en su editor, puede que no siga las mismas convenciones que el resto.

## Instalación de dependencias

Tú eliges si instalar todo al inicio o ir instalándo una a una a medida que lo necesitemos. De cualquier manera yo te iré explicando qué hace cada cosa más adelante.

De todas formas, aquí te dejo todo lo que instalaremos con NPM desde la terminal.

En primer lugar tenemos las dependencias que son esenciales tanto en el desarrollo como en producción. Estas se instalarán sin el flag `--save-dev` o `-D` ya que son dependencias regulares:

- react
- react-dom
- core-js
- Si, solo esas 3, todas las demás son dependencias de desarrollo. Así que usaremos `npm install --save-dev` o simplemente `npm i -D` como los _pros_ que somos:

> no te abrumes, ya te iré explicando para qué sirven en los pasos que siguen.

- react-refresh
- webpack
- webpack-cli
- webpack-merge
- @babel/core
- @babel/preset-env
- @babel/preset-react
- babel-loader
- style-loader
- css-loader
- sass
- sass-loader
- html-webpack-plugin
- @pmmmwh/react-refresh-webpack-plugin
- mini-css-extract-plugin

> Si te equivocas en algo, mantén la calma.
>
> Usa este comando para desinstalar una dependencia en específico. O las que necesites eliminar, cambiando la palabra "dependencia" por el nombre real de la dependencia que quieres desinstalar:
>
> ```bash
> npm uninstal dependencia
> ```
>
> Haz es o borra la dependencia de la lista, borra la carpeta `node_modules` y usa `npm install` para instalar todo lo que esté especificado en `package.json`. Pero eso no sería tan _pro_ de nuestra parte ¿o si?.

---

## Archivos de configuración de webpack

Como viste al inicio, crearemos la carpeta/directorio llamada `webpack`, en la que agregaremos 3 archivos (`webpack.dev.js`, `webpack.prod.js` y `webpack.common.js`). Estos servirán como configuración de desarrollo, confiugración para producción y la configuración en común para ambos casos.
Antes podrímos haber usado un solo archivo pero habría sido dificil de entender y mantener a largo plazo. Por eso ahora está más normalizado el uso de tres archivos separados, que se enlazarán con el uso de `webpack-merge`.

¿tú carpeta se va viendo así? ¡genial!

```
webpack/
├── webpack.common.js
├── webpack.dev.js
└── webpack.prod.js
```
