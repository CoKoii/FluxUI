#!/usr/bin/env node
import inquirer from "inquirer";
import { execSync } from "child_process";

const choices = [
  { name: "Core - 组件库 (@fluxui/core)", value: "core" },
  { name: "Playground - 本地调试 (@fluxui/playground)", value: "playground" },
  { name: "Docs - 文档站 (@fluxui/docs)", value: "docs" },
];

const run = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "target",
        message: "请选择要运行的模块：",
        choices,
      },
    ])
    .then((answers) => {
      const scriptName = `dev:${answers.target}`;
      execSync(`pnpm ${scriptName}`, { stdio: "inherit" });
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

run();
