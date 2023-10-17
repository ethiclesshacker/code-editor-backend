import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

import express from 'express';
import { execArgv } from 'process';
import {exec} from 'child_process'
import {writeFileSync, unlinkSync} from 'fs';



const langMap = {
    "python3": {
        "extension": "py",
        "compiler": "python3",
        "run": "python temp.py",
        "fileName": "temp.py"
    },
    "python2": {
        "extension": "py",
        "compiler": "python2",
        "run": "",
        "fileName": "temp.py"
    },
    "javascript": {
        "extension": "js",
        "compiler": "node",
        "run": "node temp.js",
        "fileName": "temp.js"
    }
}

//@desc     Auth User & Get Token
//@route    POST api/users/login
//@access   Public
const runCode = asyncHandler(async (req, res) => {
    const code = req.body.code;
    const codeLanguage = req.body.codeLanguage;
    console.log(code);
    try {
        writeFileSync(langMap[codeLanguage]['fileName'], code);
        // file written successfully

        exec(langMap[codeLanguage]['run'], (err, stdout, stderr) => {
            if (err) {
                console.log(err);
                res.status(500).send({ "error_msg": "An Internal Server Error Occured." })
            }
            else {
                console.log("Output", stdout);
                console.log("Error Message: ", stderr);
                res.json({
                    "output" : stdout
                })
            }
            unlinkSync(langMap[codeLanguage]['fileName']);

        });

    } catch (err) {
        console.error(err);
    }

});



export {runCode};