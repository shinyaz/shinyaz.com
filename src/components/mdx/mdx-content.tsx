import * as runtime from "react/jsx-runtime";
import { mdxComponents } from "./mdx-components";

const sharedComponents = mdxComponents;

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface MdxContentProps {
  code: string;
}

export function MdxContent({ code }: MdxContentProps) {
  const Component = useMDXComponent(code);
  return <Component components={sharedComponents} />;
}
