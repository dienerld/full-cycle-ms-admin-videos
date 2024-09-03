FROM node:20.9.0-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_ENV=development
RUN corepack enable

RUN mkdir -p $PNPM_HOME && \
    pnpm config set store-dir $PNPM_HOME

USER node

WORKDIR /home/node/app

COPY --chown=node:node . .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

CMD ["tail", "-f", "/dev/null"]
