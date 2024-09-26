import React from 'react';
import compiler from 'rehype-react';
import parser from 'remark-parse';
import mdast2hast from 'remark-rehype';
import { unified } from 'unified';

// プラグインの作成
const processor = unified()
  .use(parser)
  .use(mdast2hast)
  .use(compiler, { createElement: React.createElement });

export default processor;
