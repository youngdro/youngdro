#!/bin/sh
createType=$1
name=$2
Name=$(echo $2 | sed 's/\b[a-z]/\U&/g')
if [ "${createType}"x = "-plugin"x ];then
    if test -d "components/"${Name};then
        echo "this component exists"
    else
        cd components
        mkdir ${Name}
        cd ${Name}
        touch index.js
        echo -n '' > index.js
        echo 'import React from "react"' >> index.js
        echo 'import PropTypes from "prop-types"' >> index.js
        echo 'import Link from "next/link"' >> index.js
        echo 'import IndexStyles from "./index.scss"' >> index.js
        echo 'class '${Name}' extends React.Component {' >> index.js
        echo '   constructor(props){' >> index.js
        echo '      super(props);' >> index.js
        echo '    }' >> index.js
        echo '    render () {' >> index.js
        echo '        return (' >> index.js
        echo '            <div className="'${name}'-container">' >> index.js
        echo '                <style dangerouslySetInnerHTML={{__html: IndexStyles}}></style>' >> index.js
        echo '            </div>' >> index.js
        echo '        );' >> index.js
        echo '    }' >> index.js
        echo '}' >> index.js
        echo 'export default '${Name}';' >> index.js

        touch index.scss
        echo -n '' > index.scss
        echo '.'${name}'-container {' >> index.scss
        echo '  ' >> index.scss
        echo '}' >> index.scss

        echo "create new plugin --- "${Name}
    fi
fi
if [ "${createType}"x = "--page"x ];then
   
    echo "create new page --- "${name}
fi
