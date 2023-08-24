#!/bin/bash

pattern="packages/([^/]+)/locales"

while IFS= read -r line; do
    if [[ $line =~ $pattern ]]; then
        echo "${BASH_REMATCH[1]}"
    fi
done
