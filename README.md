# Compound Comparison Tool

#### This React app uses the following technologies:

- ReactJS
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

This is only the frontend UI. The geomean fastapi python backend `https://github.com/Kinnate/geomean-ic50-flagger.git` is used to generate the SQL and run it
against the connected Oracle database. The application was deployed using
Jenkins CI/CD pipline. The `Jenkinsfile` can be inspected to understand what is
performed. Basically, the docker image is built, then pushed to ECR, then
deployed using `helm`. The app lives in the main `apps` namespace within `helm`
as well as `kubectl`. Run `kubectl get all -n apps -l app=compound-comparison-tool` to get the kubernetes resources. Currently, the
app can be visited by navigating to: `http://compound.comparison.kinnate`. The
only parts that this frontend relies on is the backend's `compound_id`, `cros`,
`cell_incubation_hr`, `cell_line`, `cell_assay_type`, `pct_serum`, `variant` and
the main sql function: `gen_multi_cmpId_sql_template_cell()`. There are several
scheduled tasks that run in the background every couple hours to refresh new
parameters such as: FT numbers or cell lines, etc.

#### Additional notes

Once jenkins deploys the app and the pods and services are running the next step
is to expose the application through a kubernetes nginx ingress. Just as in any other app, one must add a new ingress rule to the
ingress yaml file. This can be obtained by running: `kubectl get ingress -o yaml` and applyling it locally, or editing the yaml on the fly (expert user)
like so: `kubectl edit ingress -n apps`. The ingress rule block should resemble
something like:

```
    - host: $APP_NAME.kinnate
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: $APP_NAME-svc
                port:
                  name: http
```

Then ensure this A-record is added to Route 53 with the appropriate LoadBalancer
name as the `Route traffic to` value.
