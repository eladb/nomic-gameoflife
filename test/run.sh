#!/bin/bash
../gameoflife < input1.txt | diff -w output1.txt -
../gameoflife < input2.txt | diff -w output2.txt -
../gameoflife < input3.txt | diff -w output3.txt -
../gameoflife < input4.txt | diff -w output4.txt -
../gameoflife < input5.txt | diff -w output5.txt -
