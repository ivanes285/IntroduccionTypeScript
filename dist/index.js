"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const v1_1 = __importDefault(require("./routes/v1"));
const PORT = 5000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
(0, v1_1.default)(app);
app.use((req, res) => {
    res.status(404).send('Not Found');
});
app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});
