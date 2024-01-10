#!/bin/bash

# This script updates the README.md file in the current directory
files_to_include=("01_Context.md" "02_Functional Overview.md" "03_Quality Attributes.md" "04_Constraints.md" "05_Principles.md" "06_Software Architecture.md" "07_External Interfaces.md" "08_Code.md" "09_Data.md" "10_Infrastructure Architecture.md" "11_Deployment.md" "12_Operation & Support.md" "13_Decision Log.md" "14_Bronnen.md")

echo "# Software Guidebook" > README.md

for file in "${files_to_include[@]}"
do
    echo -e "\n" >> README.md
    cat "$file" >> README.md
done