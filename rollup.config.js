// rollup.config.js
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import scss from "rollup-plugin-scss";

const packageJson = require("./package.json");

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({tsconfig: "./tsconfig.json"}),
            terser(),
            scss({fileName: 'styles.css'}),
        ],
        external: ["react", "react-dom", "react-router-dom"],
    },
    {
        input: "src/index.ts",
        output: [{file: "dist/index.d.ts", format: "es"}],
        plugins: [dts.default()],
        external: [/\.s?css$/],
    },
];