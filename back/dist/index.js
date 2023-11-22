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
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("./mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const PORT = 3001;
app_1.default.listen(PORT, () => {
    const env = app_1.default.get('env');
    console.log(`Starting Express Application (${env} mode)...`);
    dotenv_1.default.config({ path: (env === 'production' ? '.env.production' : '.env') });
    (0, mongodb_1.connect)()
        .then(() => console.log(`Express is listening at http://localhost:${PORT}`))
        .catch(reason => console.error('Unable to connect to database: ' + reason));
});
app_1.default.on('close', () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.disconnect();
}));
