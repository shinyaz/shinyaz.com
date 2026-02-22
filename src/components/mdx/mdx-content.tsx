import * as runtime from "react/jsx-runtime";
import { mdxComponents } from "./mdx-components";

const sharedComponents = mdxComponents;

const getMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface MdxContentProps {
  code: string;
}

/* eslint-disable react-hooks/static-components -- Server component; no re-render concern */
export function MdxContent({ code }: MdxContentProps) {
  const Component = getMDXComponent(code);
  return <Component components={sharedComponents} />;
}
/* eslint-enable react-hooks/static-components */
