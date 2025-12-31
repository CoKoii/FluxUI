#!/usr/bin/env node
import { select } from "@inquirer/prompts";
import { execSync } from "child_process";

const choices = [
  { name: "Core - 组件库 (@fluxuijs/core)", value: "core" },
  { name: "Playground - 本地调试 (@fluxuijs/playground)", value: "playground" },
  { name: "Docs - 文档站 (@fluxuijs/docs)", value: "docs" },
];

const run = async () => {
  try {
    const target = await select({
      message: "请选择要运行的模块：",
      choices,
    });
    const scriptName = `dev:${target}`;
    execSync(`pnpm ${scriptName}`, { stdio: "inherit" });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
