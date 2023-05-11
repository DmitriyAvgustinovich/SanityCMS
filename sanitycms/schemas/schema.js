import { createSchema } from "sanity";
import { SchemaTypes } from "sanity";

import {post} from './post';

export default createSchema({
    name: 'default',
    types: SchemaTypes.concat({
        post
    }),
})