const useRouter = jest.spyOn(require('next/router'), 'useRouter');

export function mockNextUseRouterOnce(props: {
  route: string;
  pathname: string;
  query: string;
  asPath: string;
}) {
  useRouter.mockImplementationOnce(() => ({
    route: props.route,
    pathname: props.pathname,
    query: props.query,
    asPath: props.asPath,
  }));
}

export function mockNextUseRouter(props: {
  route: string;
  pathname: string;
  query: string;
  asPath: string;
}) {
  useRouter.mockImplementation(() => ({
    route: props.route,
    pathname: props.pathname,
    query: props.query,
    asPath: props.asPath,
  }));
}
