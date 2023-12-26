import postcss from "rollup-plugin-postcss";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import terser from "@rollup/plugin-terser";

process.env.NODE_ENV = 'production';

export default {
  input: "./src/index.js",
  output: [
    {
      file: "dist/index.es.js",
      format: "esm",
    },
    {
      file: "dist/index.js",
      format: "cjs",
    },
  ],
  plugins: [
    postcss({
      plugins: [tailwindcss("./tailwind.config.js"), autoprefixer()],
      minimize: true,
      inject: {
        insertAt: "top",
      },
    }),
    babel({
      babelHelpers: "bundled",
      extensions: [".js", ".jsx"],
      presets: ["@babel/preset-react"],
      exclude: "node_modules/**",
    }),
    resolve(),
    external(),
    // terser(),
  ],
}