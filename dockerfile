FROM node:16.19.0-alpine

RUN npm install -g pnpm

# Set non-root user and expose port
USER node
EXPOSE ${PORT}

WORKDIR /home/node/app

COPY --chown=node:node package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm i --frozen-lockfile

COPY --chown=node:node . .

RUN pnpm prisma generate

CMD [ "pnpm", "dev" ]
