import postcss from "rollup-plugin-postcss";
import babel from "@rollup/plugin-babel";

process.env.NODE_ENV = 'production';

export default {
  input: "./index.js",
  output: {
    file: "./output.js",
    format: "esm",
  },
  external: ["react", "react-dom"],
  plugins: [
    postcss({
      config: {
        path: "./postcss.config.js",
      },
      extensions: [".css"],
      minimize: true,
      inject: {
        insertAt: "top",
      },
    }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
  ],
}