import styled from "styled-components/native";

import {
  typography,
  TypographyProps,
  margin,
  MarginProps,
  padding,
  PaddingProps,
  color,
  ColorProps,
  variant,
} from "styled-system";

type Props = TypographyProps &
  MarginProps &
  PaddingProps &
  ColorProps & {
    variant?: "default" | "light" | "bold";
  };

const Typography = styled.Text<Props>`
  ${typography}
  ${padding}
  ${margin}
  ${color}
  ${variant({
    variants: {
      light: {
        fontFamily: "GilroyLight",
      },
      default: {
        fontFamily: "Gilroy",
      },
      bold: {
        fontFamily: "GilroyBold",
      },
    },
  })}
  })}
`;

const Text: React.FC<Props> = (props) => {
  const { variant } = props;
  return <Typography {...props} variant={variant} />;
};

export default Text;
