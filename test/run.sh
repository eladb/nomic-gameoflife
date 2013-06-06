#!/bin/bash
node ../gameoflife.js < input1.txt | diff -w output1.txt -
node ../gameoflife.js < input2.txt | diff -w output2.txt -
node ../gameoflife.js < input3.txt | diff -w output3.txt -
node ../gameoflife.js < input4.txt | diff -w output4.txt -