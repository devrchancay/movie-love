import {
  color,
  ColorProps,
  size,
  SizeProps,
  position,
  PositionProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  padding,
  PaddingProps,
  margin,
  MarginProps,
  borderRadius,
  BorderRadiusProps,
  boxShadow,
  BoxShadowProps,
  border,
  BorderProps,
  variant,
} from "styled-system";

import styled from "styled-components/native";

type Props = ColorProps &
  SizeProps &
  PositionProps &
  FlexboxProps &
  LayoutProps &
  PaddingProps &
  MarginProps &
  BorderRadiusProps &
  BoxShadowProps &
  BorderProps & {
    variant?: "full";
  };

const Box = styled.View<Props>`
  ${color}
  ${size}
    ${position}
    ${flexbox}
    ${layout}
    ${padding}
    ${margin}
    ${borderRadius}
    ${boxShadow}
    ${border}
    ${variant({
    variants: {
      full: {
        flex: 1,
      },
    },
  })}
`;

export default Box;
