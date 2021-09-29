"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EsLintIssueFactory_1 = require("../issue/EsLintIssueFactory");
const path_1 = require("path");
const minimatch_1 = __importDefault(require("minimatch"));
const glob_1 = __importDefault(require("glob"));
function createEsLintReporter(configuration) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { CLIEngine } = require('eslint');
    const engine = new CLIEngine(configuration.options);
    let isInitialRun = true;
    let isInitialGetFiles = true;
    const lintResults = new Map();
    const includedGlobPatterns = engine.resolveFileGlobPatterns(configuration.files);
    const includedFiles = new Set();
    function isFileIncluded(path) {
        return (!path.includes('node_modules') &&
            includedGlobPatterns.some((pattern) => minimatch_1.default(path, pattern)) &&
            !engine.isPathIgnored(path));
    }
    function getFiles() {
        return __awaiter(this, void 0, void 0, function* () {
            if (isInitialGetFiles) {
                isInitialGetFiles = false;
                const resolvedGlobs = yield Promise.all(includedGlobPatterns.map((globPattern) => new Promise((resolve) => {
                    glob_1.default(globPattern, (error, resolvedFiles) => {
                        if (error) {
                            // fail silently
                            resolve([]);
                        }
                        else {
                            resolve(resolvedFiles || []);
                        }
                    });
                })));
                for (const resolvedGlob of resolvedGlobs) {
                    for (const resolvedFile of resolvedGlob) {
                        if (isFileIncluded(resolvedFile)) {
                            includedFiles.add(resolvedFile);
                        }
                    }
                }
            }
            return Array.from(includedFiles);
        });
    }
    function getDirs() {
        return includedGlobPatterns || [];
    }
    function getExtensions() {
        return configuration.options.extensions || [];
    }
    return {
        getReport: ({ changedFiles = [], deletedFiles = [] }) => __awaiter(this, void 0, void 0, function* () {
            return {
                getDependencies() {
                    return __awaiter(this, void 0, void 0, function* () {
                        for (const changedFile of changedFiles) {
                            if (isFileIncluded(changedFile)) {
                                includedFiles.add(changedFile);
                            }
                        }
                        for (const deletedFile of deletedFiles) {
                            includedFiles.delete(deletedFile);
                        }
                        return {
                            files: (yield getFiles()).map((file) => path_1.normalize(file)),
                            dirs: getDirs().map((dir) => path_1.normalize(dir)),
                            excluded: [],
                            extensions: getExtensions(),
                        };
                    });
                },
                getIssues() {
                    return __awaiter(this, void 0, void 0, function* () {
                        // cleanup old results
                        for (const changedFile of changedFiles) {
                            lintResults.delete(changedFile);
                        }
                        for (const deletedFile of deletedFiles) {
                            lintResults.delete(deletedFile);
                        }
                        // get reports
                        const lintReports = [];
                        if (isInitialRun) {
                            lintReports.push(engine.executeOnFiles(includedGlobPatterns));
                            isInitialRun = false;
                        }
                        else {
                            // we need to take care to not lint files that are not included by the configuration.
                            // the eslint engine will not exclude them automatically
                            const changedAndIncludedFiles = changedFiles.filter((changedFile) => isFileIncluded(changedFile));
                            if (changedAndIncludedFiles.length) {
                                lintReports.push(engine.executeOnFiles(changedAndIncludedFiles));
                            }
                        }
                        // output fixes if `fix` option is provided
                        if (configuration.options.fix) {
                            yield Promise.all(lintReports.map((lintReport) => CLIEngine.outputFixes(lintReport)));
                        }
                        // store results
                        for (const lintReport of lintReports) {
                            for (const lintResult of lintReport.results) {
                                lintResults.set(lintResult.filePath, lintResult);
                            }
                        }
                        // get actual list of previous and current reports
                        const results = Array.from(lintResults.values());
                        return EsLintIssueFactory_1.createIssuesFromEsLintResults(results);
                    });
                },
                close() {
                    return __awaiter(this, void 0, void 0, function* () {
                        // do nothing
                    });
                },
            };
        }),
    };
}
exports.createEsLintReporter = createEsLintReporter;
