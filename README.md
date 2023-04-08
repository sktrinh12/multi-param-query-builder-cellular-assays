# Compound Comparison Tool

#### This React app uses the following technologies:

- ReactJS
- Material UI
- axios
- AutocompleteBox
- fastapi (backend)

#### Summary

The React app is a web application that is built using ReactJS, a popular JavaScript library for building user interfaces.
The app is designed to fetch and display data related to various types of assays performed on FT/KIN compounds, and export as a `.csv` file.
The app allows users to select various parameters for the assay, including the compound ID, the CRO,
the cell incubation hour, the cell assay type, and the percentage serum. The
backend generates a dynamic SQL string that joins multiple compound ids together
based on the selected parameters. The output allows scientists to quickly
compare what assays have been performed on what compounds and their respective
geomean values.

#### Technical

The app repo lives in: `https://github.com/Kinnate/compound-comparison-tool.git`
and uses the geomean fastapi python backend to generate the SQL and run it
against the connected Oracle database. The application was deployed using
Jenkins CI/CD pipline. The `Jenkinsfile` can be inspected to understand what is
performed. Basically, the docker image is built, then pushed to ECR, then
deployed using `helm`. The app lives in the main `apps` namespace within `helm`
as well as `kubectl`. Run `kubectl get all -n apps -l app=compound-comparison-tool` to get the kubernetes resources.
