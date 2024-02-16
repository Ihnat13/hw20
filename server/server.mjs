import fastify from 'fastify';
import fastifyStatic from "@fastify/static";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = fastify()



server.register(fastifyStatic, {
    root: path.join(__dirname, '../client'),
  })

  server.post('/saveInput', async (request, reply) => {
    const enteredValue2 = request.body.name.toLowerCase().trim();
    if (enteredValue2 === '') {
        reply.code(400).send('Введите хотя бы одно слово.');
        return;
    }

    const wordsArray = enteredValue2.split(' ').filter(Boolean);
    const res = wordsArray.reduce((prevGroup, el) => {
        if (!prevGroup.has(el)) {
            prevGroup.set(el, []);
        }
        prevGroup.get(el).push(el);
        return prevGroup;
    }, new Map());

    reply.code(200).send(Array.from(res));
});

server.listen({ port: 5555})
    .then(() => {
        console.log(`ok`)
    })