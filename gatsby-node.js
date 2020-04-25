const path = require('path');

exports.createPages = async({ actions, graphql, reporter }) => {
    const { createPage } = actions;

    const staticTemplate = path.resolve('src/templates/static.js');

    const result = await graphql(`
        {
            allMarkdownRemark(
                limit: 1000
            ) {
                edges {
                    node {
                        frontmatter {
                            path
                        }
                    }
                }
            }
        }
    `);

    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`);
        return;
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
            path: node.frontmatter.path,
            component: staticTemplate,
            context: {},
        });
    });
}