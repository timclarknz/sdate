"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: [
        "/node_modules/",
        "/eDateOld.test.ts",
        "/eDateNew.test.ts"
    ]
};
