# CSV Evaluator

## Introduction

This is a NodeJS application that evaluates a given Common-Separated Value (CSV) file containing rows of mathematic algebraic expressions. Please reefer to `CSV Evaluation Task.pdf` for more information.

This application is designed to support:
1. A Tab-Separated Value (TSV) file.
2. A large CSV/TSV file with unlimited number of rows. A memory overflow error is unlikely but be prepared to wait for a long time if the file is really large.


## Requirements
- npm >= 6
- node >= 12


## Setup

```
npm install
```


## Usage

1. Place a `input.csv` that complies with the convention stated in `CSV Evaluation Task.pdf`, under folder `data`. 
2. Run `npm start` in the project directory.
3. Retrieve the output from `output.csv` under folder `data`.


## Testing

```
npm test
```