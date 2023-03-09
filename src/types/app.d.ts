type Router = import('express').Router

interface Routes {
  path?: string
  router: Router
}
