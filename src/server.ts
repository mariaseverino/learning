import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastify from 'fastify';
import {
    jsonSchemaTransform,
    serializerCompiler,
    validatorCompiler,
    ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { routes } from './routes';
import { AppError } from './errors/AppError';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, { origin: '*' });

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'ILearning API',
            version: '1.0.0',
        },
    },
    transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, { routePrefix: '/docs' });

app.register(routes);

app.setErrorHandler((error, request, reply) => {
    if (error instanceof AppError) {
        return reply.status(error.statusCode).send({ message: error.message });
    }

    return reply.status(500).send({ message: 'Internal server error' });
});

app.listen({ port: 3333 }).then(() => {
    console.log('server running');
});
