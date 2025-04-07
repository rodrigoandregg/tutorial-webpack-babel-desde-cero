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
├── config/
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
- Si, solo esas 3.
  
Todas las demás son dependencias de desarrollo. Así que usaremos `npm install --save-dev` o simplemente `npm i -D` como los _pros_ que somos:

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

Como viste al inicio, crearemos la carpeta/directorio llamada `config`, en la que agregaremos 3 archivos (`webpack.dev.js`, `webpack.prod.js` y `webpack.common.js`). Estos servirán como configuración de desarrollo, confiugración para producción y la configuración en común para ambos casos.
Antes podrímos haber usado un solo archivo pero habría sido dificil de entender y mantener a largo plazo. Por eso ahora está más normalizado el uso de tres archivos separados, que se enlazarán con el uso de `webpack-merge`.

¿tú carpeta se va viendo así? ¡genial!

```
config/
├── webpack.common.js
├── webpack.dev.js
└── webpack.prod.js
```

## Configuración común de webpack

> Instalemos algunas dependencias de producción:
> ```bash
>npm i react react-dom
> ```
> 
> Y las dependencias de desarrollo:
> ```bash
>npm i -D webpack webpack-cli webpack babel-loader html-webpack-plugin
> ```

Comenzaremos con el archivo de configuración base de webpack. Así que la configuración de desarrollo y producción tendrá que esperar.

Archivo `webpack.common.js`:

Primero te mostraré como quedaría el archivo terminado y luego te explicaré qué significa cada cosa.

### **¿Qúe necesitamos hacer primero?**

Aunque este sistema es más inteligente que nosotros y no suele confundirse, lo ideal es hacer las cosas en un orden específico para tener más claridad. Recuerda que un desarrolador debe escribir código para otros desarrolladores, no solo para la máquina.

**seguiremos este orden:**
1. **Definir punto de entrada _(entry)_ y punto de salida _(output)_. Webpack necesita saber**: 
   - Dónde comenzar a analizar dependencias.
   - Dónde y cómo debe generar los archivos compilados.
2. **Definir las reglas de manejo de archivos/recursos (module.rules)**.
   - Esto le indica a Webpack cómo transformar los diferentes tipos de archivos que encuentre mientras analiza dependencias (JSX, CSS, imágenes, etc.) 
3. **Definir la manera en que webpack resolverá las extensiones por nosotros**:
   - Esto mejora la **DX** _(Developer Experience)_, permitiendo importar archivos sin escribir extensiones manualmente.
4. **definir los plugins que se usarán en el proyecto**:
   - Aquí se extiende el comportamiento de Webpack con tareas adicionales como generar HTML, limpiar la carpeta de salida, extraer CSS, etc.

> Comando para installar dependencias:
> 
>```bash
>npm i -D
>```

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/** @type {import('webpack').Configuration} */

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
```

Si al momento de escribir el código en tu archivo `webpack.common.js` el editor no te ayuda con el autocompletado o las sugerencias, usa este comentario.
Esta es una anotación de tipo _(type annotation)_ que se usa para proporcionar autocompletado, validación y documentación en tiempo real cuando estás escribiendo la **configuración de Webpack en un archivo JavaScript**. Algo así como un supercomentario, pa los frikazos (yo).

```js
/* @type {import('webpack').Configuration} */
```

### Explicación parte por parte:

### ¿Qué es el _entry_?

La propiedad `entry` define el **punto de entrada principal** de tu aplicación. Es el archivo que Webpack usará como **punto de partida** para construir el **grafo de dependencias**, es decir, el **mapa interno** de todos los archivos y módulos que se relacionan entre sí a través de `import` o `require`.

```js
entry: './src/index.jsx'
```

Con esta línea le decimos a Webpack "Empieza a analizar mi aplicación desde el archivo ``index.jsx`` que se encuentra en la carpeta ``src``."

### **¿Qué es el _output_?**

La propiedad output en Webpack define dónde y cómo se guardará el _bundle_ final que se genera a partir del _entry_.

```js
output: {
  path: path.resolve(__dirname, '../dist'),
  filename: '[name].[contenthash].js',
  publicPath: '',
  clean: true,
}
```

**Path**: Define la ruta absoluta del directorio donde se guardará el archivo final. Usamos ``path.resolve`` para asegurarnos de que siempre se genera correctamente sin importar el sistema operativo.

- Recuerda importar _path_. Y lo importamos así porque es un módulo nativo de _Node.js_, y no hace falta instalarlo con _npm_.
```js
const path = require('path');
```

- Webpack se ejecuta en Node.js, y muchas rutas que vas a definir (como en ``output.path``) necesitan ser rutas absolutas. _Node_ no asume automáticamente desde dónde estás ejecutando, por eso usamos ``path.resolve(...)`` para asegurarnos de que siempre se construyan correctamente.

- _path_ une varios segmentos de ruta y te devuelve una ruta absoluta válida según el sistema operativo

- el resultado de `path: path.resolve(__dirname, '../dist')` es algo como `/home/usuario/proyecto/dist`.

**filename**: Es el nombre del archivo resultante.

- ``[name]`` toma el nombre del punto de entrada (por defecto: ``main``).

- ``[contenthash]`` genera un hash basado en el contenido del archivo, útil para _caché busting_: si el contenido cambia, el nombre cambia, lo que obliga al navegador a descargar la nueva versión.

**publicPath**: Define la ruta base que se usará en el navegador para cargar los archivos.

- En este caso está vacío (``''``), lo que significa que los archivos se servirán desde la raíz.

**clean**: Si está en true, Webpack limpia automáticamente el contenido del directorio de salida (dist) antes de escribir el nuevo bundle.
- Evita que se acumulen archivos viejos que ya no se usan.

### ¿Qué es ``module.rules``?

El bloque ``module.rules`` en Webpack es donde defines las reglas que Webpack debe seguir para transformar o procesar los archivos que se encuentran en tu proyecto. Cada regla tiene un ``test`` para determinar qué tipo de archivo debe aplicarse, y un ``use`` o ``loader`` que define cómo deben procesarse esos archivos.

```js
module: {
  rules: [
    {
      test: /.(js|jsx)$/,
      use: 'babel-loader',
      exclude: /node_modules/,
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
    },
  ],
},
```

### Regla para archivos JS y JSX:

```js
{
      test: /.(js|jsx)$/,
      use: 'babel-loader',
      exclude: /node_modules/,
    }
```

**test**: Especifica los archivos que deben ser procesados por esta regla. En este caso, se está utilizando una expresión regular que hace que se aplique a archivos con extensión .js o .jsx.

**use**: Aquí es donde definimos qué _loader_ se debe usar para procesar estos archivos. En este caso, ``babel-loader`` se usa para transpilar código JavaScript moderno (incluyendo JSX) a una versión compatible con los navegadores más antiguos.

**exclude**: Este campo indica qué carpetas o archivos deben ser excluidos de esta regla. En este caso, se excluyen los archivos de ``node_modules`` porque generalmente no es necesario transpilar las dependencias de terceros.

> si corres el _live server_ sin `exclude: /node_modules/` pasan cosas feas, o en otras palablas, Webpack intenta procesar todos los archivos dentro de esa carpeta, lo cual rompe el rendimiento y puede causar errores graves.

### Regla para los archivos de imágenes:

```js
{
  test: /\.(png|svg|jpg|jpeg|gif)$/i,
  type: 'asset/resource',
}
```

**test**: Aplica esta regla a archivos que tengan extensiones de imágenes como .png, .svg, .jpg, .jpeg, .gif.

**type**: Con Webpack 5, puedes usar el campo type en lugar de configurar loaders explícitamente. En este caso, ``asset/resource`` es el tipo de archivo que se debe usar, lo que le dice a Webpack que gestione las imágenes como recursos y las copie al directorio de salida (por ejemplo, la carpeta dist).

## ¿Qué es ``resolve.extensions``?

La propiedad ``resolve.extensions`` le indica a Webpack qué extensiones de archivo debe resolver automáticamente cuando se realiza una importación sin especificar la extensión.

```js
resolve: {
  extensions: ['.js', '.jsx', '.json'],
}
```

Así no tenemos que estar poniendo manualmente las extensiones de los archivos que importamos, por ejemplo: usamos `import (container) from ./src/components/container` en vez de `import (container) from ./src/components/container.jsx`.

Sin esta configuración, tendrías que escribir siempre la extensión completa, lo cual es engorroso y poco práctico, sobre todo en proyectos grandes o cuando se usan múltiples tipos de archivos (por ejemplo, .js, .jsx, .ts).

### ¿Qué es un plugin en Webpack?

Los _plugins_ extienden las capacidades de Webpack más allá del procesamiento de módulos (que es lo que hacen los _loaders_). Mientras que los _loaders_ transforman archivos, los _plugins_ manipulan el _bundle_ final, optimizan el _build_, inyectan _scripts_, limpian carpetas, entre otras tareas.

### ¿Qué hace el _plugin_ ``HtmlWebpackPlugin``?
Este _plugin_ crea un archivo ``index.html`` basado en la plantilla que le entregues (en este caso ``./public/index.html``) y automáticamente inyecta los _bundles_ de JavaScript generados por Webpack en ese HTML, sin necesidad de que lo hagas manualmente. 

Esto es útil porque Webpack genera archivos con nombres dinámicos (hash incluidos) y sería inviable actualizarlos a mano cada vez que haces un build nuevo.

```js
plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ]
```

Gracias a este plugin no necesitas poner la etiqueta `<script src="./index.js"></script>` en el archivo `index.html`. Porque el nombre del archivo `.js` generado en build nunca tiene el mismo nombre, cambia por cada vez que generamos la versión de producción, gracias a algo que veremos en la configuración de Webpack para producción.

Y no olvides importarlo:

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
```

***

## Archivo de configuración de Webpack para desarrollo

> Instalemos las dependencias de desarrollo para esta sección:
> ```bash
>npm i -D style-loader css-loader sass-loader sass @pmmmwh/react-refresh-webpack-plugin webpack-merge
> ```

Ahora veremos como quedaría nuestro archivo `webpack.dev.js`, que se enfoca en mejorar la experiencia durante el desarrollo. Este archivo debe:

- Establecer el modo en ``development``.

- Agregar un ``devtool`` adecuado para _debuggear_ (como ``'eval-source-map'``).

- Usar ``style-loader`` en lugar de extraer el CSS, para inyectarlo directamente al DOM.

- Configurar ``webpack-dev-server``.

- Hacer merge con la configuración común.

### ¿Por qué usamos **Webpack Dev Server** en lugar de la extensión **Live Server**?

Cuando trabajas con Webpack, el código fuente (como archivos JS, JSX, SCSS, etc.) necesita ser procesado y transformado antes de estar listo para el navegador. Este proceso lo hace Webpack a través de su configuración de _loaders_ y _plugins_. Por eso:

- La extensión Live Server simplemente abre archivos HTML estáticos desde el sistema de archivos.
- No entiende de _bundling_, ni transforma código con Babel, ni interpreta configuraciones de Webpack.
- Si abres tu proyecto con esta extensión, verás errores o una página en blanco porque el navegador no podrá interpretar directamente los archivos fuente que aún no han sido compilados.

En cambio, **Webpack Dev Server** sí está integrado con el proceso de _build_.
Compila, transpila y sirve los archivos resultantes desde memoria, sin escribirlos físicamente en el disco.
Además, ofrece funcionalidades clave como:

- **Live reload**: recarga la página cuando detecta cambios.

- **Hot Module Replacement (HMR)**: reemplaza solo los módulos modificados sin recargar toda la página.

- Integración con Webpack _plugins_ como HtmlWebpackPlugin, que generan archivos como ``index.html`` dinámicamente.

Despues de tanto blabla vamos con el archivo:

```js
const path = require('path')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

/** @type {import('webpack').Configuration} */

const devConfig = {
	mode: 'development',
  devtool: 'eval-source-map',
	module: {
		rules: [
			{
				test: /\.(css|sass|scss)$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
	plugins: [
		new ReactRefreshWebpackPlugin(),
	],
	devServer: {
		port: 3000,
		allowedHosts: 'all', // Permite acceder desde cualquier hostname
		static: {
			directory: path.resolve(__dirname, '../public'),
		},
		hot: true,
		open: true,
	},
}
module.exports = merge(common, devConfig)
```

## Explicación parte por parte

### devConfig

```js
const devConfig = {}
```
Cómo ves ponemos toda nuestra configuración dentro de un objeto con el nombre `devConfig` para poder combinarla con la configuración del archivo `webpack.common.js`.

### Modo desarrollo

```js
mode: 'development'
```
Esto se hace para indicarle a Webpack que genere código legible, sin minificar, y con herramientas de depuración activadas.

### Herramienta de desarrollo

```js
devtool: 'eval-source-map'
```
Esto nos permite ver los archivos originales en el navegador al depurar, sin sacrificar demasiado rendimiento.

### Reglas: Loaders de estilos

```js
module: {
		rules: [
			{
				test: /\.(css|sass|scss)$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	}
```
Los loaders de estilos se utilizan para procesar los archivos CSS, SASS y SCSS, transformándolos en algo que el navegador pueda interpretar y mostrar correctamente. En nuestra configuración, estamos usando tres loaders: ``style-loader``, ``css-loader`` y ``sass-loader``.

La secuencia en que se definen estos loaders es muy importante, ya que cada uno hace una tarea específica en el proceso de transformación de los archivos de estilos. Vamos a ver por qué se usan en este orden:

**sass-loader**: Transforma el código SCSS/SASS en CSS.

**css-loader**: Interpreta los archivos CSS, resuelve los @import, url(), y convierte los archivos CSS en módulos.

**style-loader**: Inyecta el CSS procesado dentro del HTML para que el navegador pueda usarlo.

> Si pensaste "¿Por qué están en orden invertido entonces?" recuerda que webpack lee los loaders de derecha a ezquierda, del último al primero.
>
> Primero lee el loader de SASS, luego el de CSS y por último el `style-loader`

### Plugins

```js
plugins: [
		new ReactRefreshWebpackPlugin(),
	]
```
Para nuestra configuración de desarrollo solo usaremos `ReactRefreshWebpackPlugin`. Tal como te expliqué antes, en la comparación con la extensión Dev Server de VSCode, este plugin tiene como propósito proporcionar una experiencia de desarrollo más fluida y rápida al trabajar con aplicaciones React, especialmente durante el proceso de hot reloading.

No olvides importarlo:
```js
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
```

## Dev server

```js
	devServer: {
		port: 3000,
		allowedHosts: 'all',
		static: {
			directory: path.resolve(__dirname, '../public'),
		},
		hot: true,
		open: true,
	}
```

Usaremos la configuración de Webpack Dev Server, que ahora es nativa de Webpack y no necesitamos instalar ninguna dependencia, para recargar automáticamente y servir contenido localmente. Esto recarga los cambios en tiempo real y mejora el flujo de trabajo.

Tambíén importamos ese `path`:
```js
const path = require('path');
```

**Desglosemos esta config:**

- `port: 3000`: puedes poner cualquier puerto que quieras. Si tienes otro servicio que también usa el puerto 3000, puedes cambiarlo por otro número.
- `allowedHosts: 'all'`: Con esto le decimos a Webpack que permita todos (_all_) los Hostnames. Básicamente permite que cualquier dispositivo en la red local o cualquier hostname acceda al servidor de desarrollo. Se usa cuando no necesitas restringir el acceso. Si trabajas en algo muy privado, seguramente tú sabrás mejor que yo qué hacer.
- `static:{directory:path.resolve(__dirname, '../public')}`: Estamos indicando el directorio/carpeta en que se encuentran los archivos **estáticos** (los archivos como imágenes, fuentes y otros activos que no requieren procesamiento)  que queremos servir. En este caso, estamos usando el directorio public que está en la raíz de nuestro proyecto
- `hot: true`: Esto habilita el **HMR** y solo funciona gracias a Michael Mok, el creador del plugin ReactRefreshWebpackPlugin. El Hot Module Replacement (HMR) usa este plugin, el cual permite que solo las partes del código que han cambiado se recarguen sin necesidad de recargar toda la página.
- `open: true`: Aquí le estamos diciendo al servidor que se abra automaticamente en el navegador, ahorrándote el proceso de abrir el navegador manualmente y escribir la URL del servidor local en la barra de direcciones.


### Webpack merge

```js
module.exports = merge(common, devConfig)
```

Usamos `merge()` desde `webpack-merge` para fusionar los archivos `webpack.common.js` y nuestro objeto `devConfig`. Por eso al inicio importamos el archivo de configuración común y `merge`

```js
const common = require('./webpack.common')
const { merge } = require('webpack-merge')
```