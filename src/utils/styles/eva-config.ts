import { scale, IS_ANDROID } from "../helpers";

export const evaConfig = {
  $schema: "./node_modules/@eva-design/dss/schema/schema.json",
  version: 1.0,
  strict: {
    "text-font-family": "System",

    "text-heading-1-font-size": scale(36),
    "text-heading-1-font-weight": "800",
    "text-heading-1-font-family": "$text-font-family",

    "text-heading-2-font-size": scale(32),
    "text-heading-2-font-weight": "800",
    "text-heading-2-font-family": "$text-font-family",

    "text-heading-3-font-size": scale(30),
    "text-heading-3-font-weight": "800",
    "text-heading-3-font-family": "$text-font-family",

    "text-heading-4-font-size": scale(26),
    "text-heading-4-font-weight": "800",
    "text-heading-4-font-family": "$text-font-family",

    "text-heading-5-font-size": scale(22),
    "text-heading-5-font-weight": "800",
    "text-heading-5-font-family": "$text-font-family",

    "text-heading-6-font-size": scale(18),
    "text-heading-6-font-weight": "800",
    "text-heading-6-font-family": "$text-font-family",

    "text-subtitle-1-font-size": scale(15),
    "text-subtitle-1-font-weight": "600",
    "text-subtitle-1-font-family": "$text-font-family",

    "text-subtitle-2-font-size": scale(13),
    "text-subtitle-2-font-weight": "600",
    "text-subtitle-2-font-family": "$text-font-family",

    "text-paragraph-1-font-size": scale(15),
    "text-paragraph-1-font-weight": "400",
    "text-paragraph-1-font-family": "$text-font-family",

    "text-paragraph-2-font-size": scale(13),
    "text-paragraph-2-font-weight": "400",
    "text-paragraph-2-font-family": "$text-font-family",

    "text-caption-1-font-size": scale(12),
    "text-caption-1-font-weight": "400",
    "text-caption-1-font-family": "$text-font-family",

    "text-caption-2-font-size": scale(12),
    "text-caption-2-font-weight": "600",
    "text-caption-2-font-family": "$text-font-family",

    "text-label-font-size": scale(12),
    "text-label-font-weight": "800",
    "text-label-font-family": "$text-font-family",

    "size-tiny": scale(24),
    "size-small": scale(32),
    "size-medium": scale(40),
    "size-large": scale(48),
    "size-giant": scale(56),

    "border-radius": scale(4),
    "border-width": scale(1),
  },
  components: {
    Avatar: {
      meta: {
        scope: "all",
        parameters: {
          roundCoefficient: {
            type: "number",
          },
          width: {
            type: "number",
          },
          height: {
            type: "number",
          },
        },
        appearances: {
          default: {
            default: true,
          },
        },
        variantGroups: {
          shape: {
            round: {
              default: true,
            },
            rounded: {
              default: false,
            },
            square: {
              default: false,
            },
          },
          size: {
            tiny: {
              default: false,
            },
            small: {
              default: false,
            },
            medium: {
              default: false,
            },
            large: {
              default: true,
            },
            giant: {
              default: false,
            },
          },
        },
        states: {},
      },
      appearances: {
        default: {
          mapping: {},
          variantGroups: {
            shape: {
              round: {
                roundCoefficient: 0.5,
              },
              rounded: {
                roundCoefficient: 0.3,
              },
              square: {
                roundCoefficient: 0.0,
              },
            },
            size: {
              tiny: {
                width: "size-tiny",
                height: "size-tiny",
              },
              small: {
                width: "size-small",
                height: "size-small",
              },
              medium: {
                width: "size-medium",
                height: "size-medium",
              },
              large: {
                width: "size-large",
                height: "size-large",
              },
              giant: {
                width: "size-giant",
                height: "size-giant",
              },
            },
          },
        },
      },
    },
    BottomNavigationTab: {
      meta: {
        scope: "mobile",
        parameters: {
          paddingHorizontal: {
            type: "number",
          },
          paddingVertical: {
            type: "number",
          },
          iconMarginVertical: {
            type: "number",
          },
          iconWidth: {
            type: "number",
          },
          iconHeight: {
            type: "number",
          },
          iconTintColor: {
            type: "string",
          },
          textMarginVertical: {
            type: "number",
          },
          textColor: {
            type: "string",
          },
          textFontFamily: {
            type: "string",
          },
          textFontSize: {
            type: "number",
          },
          textFontWeight: {
            type: "string",
          },
        },
        appearances: {
          default: {
            default: true,
          },
        },
        variantGroups: {},
        states: {
          selected: {
            default: false,
            priority: 0,
            scope: "mobile",
          },
          hover: {
            default: false,
            priority: 1,
            scope: "mobile",
          },
          focused: {
            default: false,
            priority: 2,
            scope: "mobile",
          },
        },
      },
      appearances: {
        default: {
          mapping: {
            textMarginVertical: 2,
            textFontSize: "text-caption-2-font-size",
            textFontWeight: "text-caption-2-font-weight",
            textFontFamily: "text-caption-2-font-family",
            textColor: "text-hint-color",
            iconWidth: 24,
            iconHeight: 24,
            iconMarginVertical: 2,
            iconTintColor: "text-hint-color",
            state: {
              hover: {
                textColor: "text-primary-hover-color",
                iconTintColor: "text-primary-hover-color",
              },
              selected: {
                textColor: "text-primary-color",
                iconTintColor: "text-primary-color",
              },
            },
          },
        },
      },
    },
    BottomNavigation: {
      meta: {
        scope: "mobile",
        parameters: {
          minHeight: {
            type: "number",
          },
          paddingVertical: {
            type: "number",
          },
          backgroundColor: {
            type: "string",
          },
          borderTopColor: {
            type: "string",
          },
          borderTopWidth: {
            type: "number",
          },
          indicatorHeight: {
            type: "number",
          },
          indicatorBackgroundColor: {
            type: "string",
          },
        },
        appearances: {
          default: {
            default: true,
          },
          noIndicator: {
            default: false,
          },
        },
        variantGroups: {},
        states: {},
      },
      appearances: {
        default: {
          mapping: {
            minHeight: 56,
            paddingVertical: 4,
            backgroundColor: "background-basic-color-1",
            indicatorHeight: 4,
            indicatorBackgroundColor: "color-primary-default",
          },
        },
        noIndicator: {
          mapping: {
            indicatorHeight: 0,
            indicatorBackgroundColor: "transparent",
          },
        },
      },
    },
    Button: {
      meta: {
        scope: "all",
        parameters: {
          minWidth: {
            type: "number",
          },
          minHeight: {
            type: "number",
          },
          paddingHorizontal: {
            type: "number",
          },
          paddingVertical: {
            type: "number",
          },
          borderRadius: {
            type: "number",
          },
          borderColor: {
            type: "string",
          },
          borderWidth: {
            type: "number",
          },
          backgroundColor: {
            type: "string",
          },
          textMarginHorizontal: {
            type: "number",
          },
          textFontFamily: {
            type: "string",
          },
          textFontSize: {
            type: "number",
          },
          textFontWeight: {
            type: "string",
          },
          textColor: {
            type: "string",
          },
          iconWidth: {
            type: "number",
          },
          iconHeight: {
            type: "number",
          },
          iconTintColor: {
            type: "string",
          },
          iconMarginHorizontal: {
            type: "number",
          },
        },
        appearances: {
          filled: {
            default: true,
          },
          outline: {
            default: false,
          },
          ghost: {
            default: false,
          },
        },
        variantGroups: {
          status: {
            basic: {
              default: false,
            },
            primary: {
              default: true,
            },
            success: {
              default: false,
            },
            info: {
              default: false,
            },
            warning: {
              default: false,
            },
            danger: {
              default: false,
            },
            control: {
              default: false,
            },
          },
          size: {
            tiny: {
              default: false,
            },
            small: {
              default: false,
            },
            medium: {
              default: false,
            },
            large: {
              default: true,
            },
            giant: {
              default: false,
            },
          },
        },
        states: {
          hover: {
            default: false,
            priority: 0,
            scope: "all",
          },
          disabled: {
            default: false,
            priority: 1,
            scope: "all",
          },
          active: {
            default: false,
            priority: 2,
            scope: "all",
          },
          focused: {
            default: false,
            priority: 3,
            scope: "mobile",
          },
        },
      },
      appearances: {
        filled: {
          mapping: {
            textFontFamily: "text-font-family",
            iconMarginHorizontal: 4,
          },
          variantGroups: {
            status: {
              basic: {
                borderColor: "color-basic-default-border",
                backgroundColor: "color-basic-default",
                textColor: "color-basic-800",
                iconTintColor: "color-basic-800",
                state: {
                  focused: {
                    borderColor: "color-basic-focus-border",
                    backgroundColor: "color-basic-focus",
                  },
                  hover: {
                    borderColor: "color-basic-hover-border",
                    backgroundColor: "color-basic-hover",
                  },
                  active: {
                    borderColor: "color-basic-active-border",
                    backgroundColor: "color-basic-active",
                  },
                  disabled: {
                    borderColor: "color-basic-disabled-border",
                    backgroundColor: "color-basic-disabled",
                    textColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                  },
                },
              },
              primary: {
                borderColor: "color-primary-default-border",
                backgroundColor: "color-primary-default",
                textColor: "text-control-color",
                iconTintColor: "text-control-color",
                state: {
                  focused: {
                    borderColor: "color-primary-focus-border",
                    backgroundColor: "color-primary-focus",
                  },
                  hover: {
                    borderColor: "color-primary-hover-border",
                    backgroundColor: "color-primary-hover",
                  },
                  active: {
                    borderColor: "color-primary-active-border",
                    backgroundColor: "color-primary-active",
                  },
                  disabled: {
                    borderColor: "color-primary-disabled-border",
                    backgroundColor: "color-primary-disabled",
                    textColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                  },
                },
              },
              success: {
                borderColor: "color-success-default-border",
                backgroundColor: "color-success-default",
                textColor: "text-control-color",
                iconTintColor: "text-control-color",
                state: {
                  focused: {
                    borderColor: "color-success-focus-border",
                    backgroundColor: "color-success-focus",
                  },
                  hover: {
                    borderColor: "color-success-hover-border",
                    backgroundColor: "color-success-hover",
                  },
                  active: {
                    borderColor: "color-success-active-border",
                    backgroundColor: "color-success-active",
                  },
                  disabled: {
                    borderColor: "color-success-disabled-border",
                    backgroundColor: "color-success-disabled",
                    textColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                  },
                },
              },
              info: {
                borderColor: "color-info-default-border",
                backgroundColor: "color-info-default",
                textColor: "text-control-color",
                iconTintColor: "text-control-color",
                state: {
                  focused: {
                    borderColor: "color-info-focus-border",
                    backgroundColor: "color-info-focus",
                  },
                  hover: {
                    borderColor: "color-info-hover-border",
                    backgroundColor: "color-info-hover",
                  },
                  active: {
                    borderColor: "color-info-active-border",
                    backgroundColor: "color-info-active",
                  },
                  disabled: {
                    borderColor: "color-info-disabled-border",
                    backgroundColor: "color-info-disabled",
                    textColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                  },
                },
              },
              warning: {
                borderColor: "color-warning-default-border",
                backgroundColor: "color-warning-default",
                textColor: "text-control-color",
                iconTintColor: "text-control-color",
                state: {
                  focused: {
                    borderColor: "color-warning-focus-border",
                    backgroundColor: "color-warning-focus",
                  },
                  hover: {
                    borderColor: "color-warning-hover-border",
                    backgroundColor: "color-warning-hover",
                  },
                  active: {
                    borderColor: "color-warning-active-border",
                    backgroundColor: "color-warning-active",
                  },
                  disabled: {
                    borderColor: "color-warning-disabled-border",
                    backgroundColor: "color-warning-disabled",
                    textColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                  },
                },
              },
              danger: {
                borderColor: "color-danger-default-border",
                backgroundColor: "color-danger-default",
                textColor: "text-control-color",
                iconTintColor: "text-control-color",
                state: {
                  focused: {
                    borderColor: "color-danger-focus-border",
                    backgroundColor: "color-danger-focus",
                  },
                  hover: {
                    borderColor: "color-danger-hover-border",
                    backgroundColor: "color-danger-hover",
                  },
                  active: {
                    borderColor: "color-danger-active-border",
                    backgroundColor: "color-danger-active",
                  },
                  disabled: {
                    borderColor: "color-danger-disabled-border",
                    backgroundColor: "color-danger-disabled",
                    textColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                  },
                },
              },
              control: {
                borderColor: "color-control-default-border",
                backgroundColor: "color-control-default",
                textColor: "color-basic-800",
                iconTintColor: "color-basic-800",
                state: {
                  focused: {
                    borderColor: "color-control-focus-border",
                    backgroundColor: "color-control-focus",
                  },
                  hover: {
                    borderColor: "color-control-hover-border",
                    backgroundColor: "color-control-hover",
                  },
                  active: {
                    borderColor: "color-control-active-border",
                    backgroundColor: "color-control-active",
                  },
                  disabled: {
                    borderColor: "color-control-disabled-border",
                    backgroundColor: "color-control-disabled",
                    textColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                  },
                },
              },
            },
            size: {
              tiny: {
                minWidth: "size-tiny",
                minHeight: "size-tiny",
                borderRadius: "border-radius",
                borderWidth: "border-width",
                paddingHorizontal: 6,
                paddingVertical: 6,
                textMarginHorizontal: 6,
                textFontSize: 10,
                textFontWeight: "bold",
                iconWidth: 12,
                iconHeight: 12,
                iconMarginHorizontal: 6,
              },
              small: {
                minWidth: "size-small",
                minHeight: "size-small",
                borderRadius: "border-radius",
                borderWidth: "border-width",
                paddingHorizontal: 8,
                paddingVertical: 8,
                textMarginHorizontal: 8,
                textFontSize: 12,
                textFontWeight: "bold",
                iconWidth: 16,
                iconHeight: 16,
                iconMarginHorizontal: 8,
              },
              medium: {
                minWidth: "size-medium",
                minHeight: "size-medium",
                borderRadius: "border-radius",
                borderWidth: "border-width",
                paddingHorizontal: 10,
                paddingVertical: 12,
                textMarginHorizontal: 10,
                textFontSize: 14,
                textFontWeight: "bold",
                iconWidth: 20,
                iconHeight: 20,
                iconMarginHorizontal: 10,
              },
              large: {
                minWidth: "size-large",
                minHeight: "size-large",
                borderRadius: "border-radius",
                borderWidth: "border-width",
                paddingHorizontal: 10,
                paddingVertical: 14,
                textMarginHorizontal: 10,
                textFontSize: 16,
                textFontWeight: "bold",
                iconWidth: 24,
                iconHeight: 24,
                iconMarginHorizontal: 10,
              },
              giant: {
                minWidth: "size-giant",
                minHeight: "size-giant",
                borderRadius: "border-radius",
                borderWidth: "border-width",
                paddingHorizontal: 12,
                paddingVertical: 16,
                textMarginHorizontal: 12,
                textFontSize: 18,
                textFontWeight: "bold",
                iconWidth: 24,
                iconHeight: 24,
                iconMarginHorizontal: 12,
              },
            },
          },
        },
        outline: {
          mapping: {},
          variantGroups: {
            status: {
              basic: {
                borderColor: "color-basic-transparent-default-border",
                backgroundColor: "color-basic-transparent-default",
                textColor: "text-hint-color",
                iconTintColor: "text-hint-color",
                state: {
                  focused: {
                    borderColor: "color-basic-transparent-focus-border",
                    backgroundColor: "color-basic-transparent-focus",
                    textColor: "text-hint-color",
                    iconTintColor: "text-hint-color",
                  },
                  hover: {
                    borderColor: "color-basic-transparent-hover-border",
                    backgroundColor: "color-basic-transparent-hover",
                    textColor: "text-hint-color",
                    iconTintColor: "text-hint-color",
                  },
                  active: {
                    borderColor: "color-basic-transparent-active-border",
                    backgroundColor: "color-basic-transparent-active",
                    textColor: "text-hint-color",
                    iconTintColor: "text-hint-color",
                  },
                  disabled: {
                    borderColor: "color-basic-transparent-disabled-border",
                    backgroundColor: "color-basic-transparent-disabled",
                    textColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                  },
                },
              },
              primary: {
                borderColor: "color-primary-transparent-default-border",
                backgroundColor: "color-primary-transparent-default",
                textColor: "text-primary-color",
                iconTintColor: "text-primary-color",
                state: {
                  focused: {
                    borderColor: "color-primary-transparent-focus-border",
                    backgroundColor: "color-primary-transparent-focus",
                    textColor: "text-primary-color",
                    iconTintColor: "text-primary-color",
                  },
                  hover: {
                    borderColor: "color-primary-transparent-hover-border",
                    backgroundColor: "color-primary-transparent-hover",
                    textColor: "text-primary-color",
                    iconTintColor: "text-primary-color",
                  },
                  active: {
                    borderColor: "color-primary-transparent-active-border",
                    backgroundColor: "color-primary-transparent-active",
                    textColor: "text-primary-color",
                    iconTintColor: "text-primary-color",
                  },
                  disabled: {
                    borderColor: "color-primary-transparent-disabled-border",
                    backgroundColor: "color-primary-transparent-disabled",
                    textColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                  },
                },
              },
              success: {
                borderColor: "color-success-transparent-default-border",
                backgroundColor: "color-success-transparent-default",
                textColor: "text-success-color",
                iconTintColor: "text-success-color",
                state: {
                  focused: {
                    borderColor: "color-success-transparent-focus-border",
                    backgroundColor: "color-success-transparent-focus",
                    textColor: "text-success-color",
                    iconTintColor: "text-success-color",
                  },
                  hover: {
                    borderColor: "color-success-transparent-hover-border",
                    backgroundColor: "color-success-transparent-hover",
                    textColor: "text-success-color",
                    iconTintColor: "text-success-color",
                  },
                  active: {
                    borderColor: "color-success-transparent-active-border",
                    backgroundColor: "color-success-transparent-active",
                    textColor: "text-success-color",
                    iconTintColor: "text-success-color",
                  },
                  disabled: {
                    borderColor: "color-success-transparent-disabled-border",
                    backgroundColor: "color-success-transparent-disabled",
                    textColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                  },
                },
              },
              info: {
                borderColor: "color-info-transparent-default-border",
                backgroundColor: "color-info-transparent-default",
                textColor: "text-info-color",
                iconTintColor: "text-info-color",
                state: {
                  focused: {
                    borderColor: "color-info-transparent-focus-border",
                    backgroundColor: "color-info-transparent-focus",
                    textColor: "text-info-color",
                    iconTintColor: "text-info-color",
                  },
                  hover: {
                    borderColor: "color-info-transparent-hover-border",
                    backgroundColor: "color-info-transparent-hover",
                    textColor: "text-info-color",
                    iconTintColor: "text-info-color",
                  },
                  active: {
                    borderColor: "color-info-transparent-active-border",
                    backgroundColor: "color-info-transparent-active",
                    textColor: "text-info-color",
                    iconTintColor: "text-info-color",
                  },
                  disabled: {
                    borderColor: "color-info-transparent-disabled-border",
                    backgroundColor: "color-info-transparent-disabled",
                    textColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                  },
                },
              },
              warning: {
                borderColor: "color-warning-transparent-default-border",
                backgroundColor: "color-warning-transparent-default",
                textColor: "text-warning-color",
                iconTintColor: "text-warning-color",
                state: {
                  focused: {
                    borderColor: "color-warning-transparent-focus-border",
                    backgroundColor: "color-warning-transparent-focus",
                    textColor: "text-warning-color",
                    iconTintColor: "text-warning-color",
                  },
                  hover: {
                    borderColor: "color-warning-transparent-hover-border",
                    backgroundColor: "color-warning-transparent-hover",
                    textColor: "text-warning-color",
                    iconTintColor: "text-warning-color",
                  },
                  active: {
                    borderColor: "color-warning-transparent-active-border",
                    backgroundColor: "color-warning-transparent-active",
                    textColor: "text-warning-color",
                    iconTintColor: "text-warning-color",
                  },
                  disabled: {
                    borderColor: "color-warning-transparent-disabled-border",
                    backgroundColor: "color-warning-transparent-disabled",
                    textColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                  },
                },
              },
              danger: {
                borderColor: "color-danger-transparent-default-border",
                backgroundColor: "color-danger-transparent-default",
                textColor: "text-danger-color",
                iconTintColor: "text-danger-color",
                state: {
                  focused: {
                    borderColor: "color-danger-transparent-focus-border",
                    backgroundColor: "color-danger-transparent-focus",
                    textColor: "text-danger-color",
                    iconTintColor: "text-danger-color",
                  },
                  hover: {
                    borderColor: "color-danger-transparent-hover-border",
                    backgroundColor: "color-danger-transparent-hover",
                    textColor: "text-danger-color",
                    iconTintColor: "text-danger-color",
                  },
                  active: {
                    borderColor: "color-danger-transparent-active-border",
                    backgroundColor: "color-danger-transparent-active",
                    textColor: "text-danger-color",
                    iconTintColor: "text-danger-color",
                  },
                  disabled: {
                    borderColor: "color-danger-transparent-disabled-border",
                    backgroundColor: "color-danger-transparent-disabled",
                    textColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                  },
                },
              },
              control: {
                borderColor: "color-control-transparent-default-border",
                backgroundColor: "color-control-transparent-default",
                textColor: "text-control-color",
                iconTintColor: "text-control-color",
                state: {
                  focused: {
                    borderColor: "color-control-transparent-focus-border",
                    backgroundColor: "color-control-transparent-focus",
                    textColor: "text-control-color",
                    iconTintColor: "text-control-color",
                  },
                  hover: {
                    borderColor: "color-control-transparent-hover-border",
                    backgroundColor: "color-control-transparent-hover",
                    textColor: "text-control-color",
                    iconTintColor: "text-control-color",
                  },
                  active: {
                    borderColor: "color-control-transparent-active-border",
                    backgroundColor: "color-control-transparent-active",
                    textColor: "text-control-color",
                    iconTintColor: "text-control-color",
                  },
                  disabled: {
                    borderColor: "color-control-transparent-disabled-border",
                    backgroundColor: "color-control-transparent-disabled",
                    textColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                  },
                },
              },
            },
          },
        },
        ghost: {
          mapping: {},
          variantGroups: {
            status: {
              basic: {
                borderColor: "transparent",
                backgroundColor: "transparent",
                textColor: "text-hint-color",
                iconTintColor: "text-hint-color",
                state: {
                  focused: {
                    borderColor: "color-basic-transparent-500",
                    backgroundColor: "color-basic-transparent-200",
                    textColor: "text-hint-color",
                    iconTintColor: "text-hint-color",
                  },
                  hover: {
                    borderColor: "transparent",
                    backgroundColor: "color-basic-transparent-100",
                    textColor: "text-hint-color",
                    iconTintColor: "text-hint-color",
                  },
                  active: {
                    borderColor: "transparent",
                    backgroundColor: "color-basic-transparent-200",
                    textColor: "text-hint-color",
                    iconTintColor: "text-hint-color",
                  },
                  disabled: {
                    borderColor: "transparent",
                    backgroundColor: "color-basic-transparent-200",
                    textColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                  },
                },
              },
              primary: {
                borderColor: "transparent",
                backgroundColor: "transparent",
                textColor: "text-primary-color",
                iconTintColor: "text-primary-color",
                state: {
                  focused: {
                    borderColor: "color-basic-transparent-500",
                    backgroundColor: "color-basic-transparent-200",
                    textColor: "text-primary-color",
                    iconTintColor: "text-primary-color",
                  },
                  hover: {
                    borderColor: "transparent",
                    backgroundColor: "color-basic-transparent-100",
                    textColor: "text-primary-color",
                    iconTintColor: "text-primary-color",
                  },
                  active: {
                    borderColor: "transparent",
                    backgroundColor: "color-basic-transparent-200",
                    textColor: "text-primary-color",
                    iconTintColor: "text-primary-color",
                  },
                  disabled: {
                    borderColor: "transparent",
                    backgroundColor: "color-basic-transparent-200",
                    textColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                  },
                },
              },
              success: {
                borderColor: "transparent",
                backgroundColor: "transparent",
                textColor: "text-success-color",
                iconTintColor: "text-success-color",
                state: {
                  focused: {
                    borderColor: "color-basic-transparent-500",
                    backgroundColor: "color-basic-transparent-200",
                    textColor: "text-success-color",
                    iconTintColor: "text-success-color",
                  },
                  hover: {
                    borderColor: "transparent",
                    backgroundColor: "color-basic-transparent-100",
                    textColor: "text-success-color",
                    iconTintColor: "text-success-color",
                  },
                  active: {
                    borderColor: "transparent",
                    backgroundColor: "color-basic-transparent-200",
                    textColor: "text-success-color",
                    iconTintColor: "text-success-color",
                  },
                  disabled: {
                    borderColor: "transparent",
                    backgroundColor: "color-basic-transparent-200",
                    textColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                  },
                },
              },
              info: {
                borderColor: "transparent",
                backgroundColor: "transparent",
                textColor: "text-info-color",
                iconTintColor: "text-info-color",
                state: {
                  focused: {
                    borderColor: "color-basic-transparent-500",
                    backgroundColor: "color-basic-transparent-200",
                    textColor: "text-info-color",
                    iconTintColor: "text-info-color",
                  },
                  hover: {
                    borderColor: "transparent",
                    backgroundColor: "color-basic-transparent-100",
                    textColor: "text-info-color",
                    iconTintColor: "text-info-color",
                  },
                  active: {
                    borderColor: "transparent",
                    backgroundColor: "color-basic-transparent-200",
                    textColor: "text-info-color",
                    iconTintColor: "text-info-color",
                  },
                  disabled: {
                    borderColor: "transparent",
                    backgroundColor: "color-basic-transparent-200",
                    textColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                  },
                },
              },
              warning: {
                borderColor: "transparent",
                backgroundColor: "transparent",
                textColor: "text-warning-color",
                iconTintColor: "text-warning-color",
                state: {
                  focused: {
                    borderColor: "color-basic-transparent-500",
                    backgroundColor: "color-basic-transparent-200",
                    textColor: "text-info-color",
                    iconTintColor: "text-info-color",
                  },
                  hover: {
                    borderColor: "transparent",
                    backgroundColor: "color-basic-transparent-100",
                    textColor: "text-warning-color",
                    iconTintColor: "text-warning-color",
                  },
                  active: {
                    borderColor: "transparent",
                    backgroundColor: "color-basic-transparent-200",
                    textColor: "text-warning-color",
                    iconTintColor: "text-warning-color",
                  },
                  disabled: {
                    borderColor: "transparent",
                    backgroundColor: "color-basic-transparent-200",
                    textColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                  },
                },
              },
              danger: {
                borderColor: "transparent",
                backgroundColor: "transparent",
                textColor: "text-danger-color",
                iconTintColor: "text-danger-color",
                state: {
                  focused: {
                    borderColor: "color-basic-transparent-500",
                    backgroundColor: "color-basic-transparent-200",
                    textColor: "text-danger-color",
                    iconTintColor: "text-danger-color",
                  },
                  hover: {
                    borderColor: "transparent",
                    backgroundColor: "color-basic-transparent-100",
                    textColor: "text-danger-color",
                    iconTintColor: "text-danger-color",
                  },
                  active: {
                    borderColor: "transparent",
                    backgroundColor: "color-basic-transparent-200",
                    textColor: "text-danger-color",
                    iconTintColor: "text-danger-color",
                  },
                  disabled: {
                    borderColor: "transparent",
                    backgroundColor: "color-basic-transparent-200",
                    textColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                  },
                },
              },
              control: {
                borderColor: "transparent",
                backgroundColor: "transparent",
                textColor: "text-control-color",
                iconTintColor: "text-control-color",
                state: {
                  focused: {
                    borderColor: "color-basic-transparent-500",
                    backgroundColor: "color-basic-transparent-200",
                    textColor: "text-control-color",
                    iconTintColor: "text-control-color",
                  },
                  hover: {
                    borderColor: "transparent",
                    backgroundColor: "color-basic-transparent-100",
                    textColor: "text-control-color",
                    iconTintColor: "text-control-color",
                  },
                  active: {
                    borderColor: "transparent",
                    backgroundColor: "color-basic-transparent-200",
                    textColor: "text-control-color",
                    iconTintColor: "text-control-color",
                  },
                  disabled: {
                    borderColor: "transparent",
                    backgroundColor: "color-basic-transparent-200",
                    textColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                  },
                },
              },
            },
          },
        },
      },
    },
    ButtonGroup: {
      meta: {
        scope: "all",
        parameters: {
          borderRadius: {
            type: "number",
          },
          borderWidth: {
            type: "number",
          },
          borderColor: {
            type: "string",
          },
          dividerBackgroundColor: {
            type: "string",
          },
          dividerWidth: {
            type: "string",
          },
        },
        appearances: {
          filled: {
            default: true,
          },
          outline: {
            default: false,
          },
        },
        variantGroups: {
          status: {
            basic: {
              default: false,
            },
            primary: {
              default: true,
            },
            success: {
              default: false,
            },
            info: {
              default: false,
            },
            warning: {
              default: false,
            },
            danger: {
              default: false,
            },
            control: {
              default: false,
            },
          },
          size: {
            tiny: {
              default: false,
            },
            small: {
              default: false,
            },
            medium: {
              default: false,
            },
            large: {
              default: true,
            },
            giant: {
              default: false,
            },
          },
        },
        states: {},
      },
      appearances: {
        filled: {
          mapping: {
            borderColor: "transparent",
            dividerWidth: 1,
          },
          variantGroups: {
            size: {
              tiny: {
                borderRadius: "border-radius",
                borderWidth: "border-width",
              },
              small: {
                borderRadius: "border-radius",
                borderWidth: "border-width",
              },
              medium: {
                borderRadius: "border-radius",
                borderWidth: "border-width",
              },
              large: {
                borderRadius: "border-radius",
                borderWidth: "border-width",
              },
              giant: {
                borderRadius: "border-radius",
                borderWidth: "border-width",
              },
            },
            status: {
              basic: {
                dividerBackgroundColor: "border-basic-color-2",
              },
              primary: {
                dividerBackgroundColor: "border-primary-color-2",
              },
              success: {
                dividerBackgroundColor: "border-success-color-2",
              },
              info: {
                dividerBackgroundColor: "border-info-color-2",
              },
              warning: {
                dividerBackgroundColor: "border-warning-color-2",
              },
              danger: {
                dividerBackgroundColor: "border-danger-color-2",
              },
              control: {
                dividerBackgroundColor: "color-basic-200",
              },
            },
          },
        },
        outline: {
          mapping: {},
          variantGroups: {
            status: {
              basic: {
                borderColor: "color-basic-default-border",
                dividerBackgroundColor: "color-basic-default",
              },
              primary: {
                borderColor: "color-primary-default-border",
                dividerBackgroundColor: "color-primary-default",
              },
              success: {
                borderColor: "color-success-default-border",
                dividerBackgroundColor: "color-success-default",
              },
              info: {
                borderColor: "color-info-default-border",
                dividerBackgroundColor: "color-info-default",
              },
              warning: {
                borderColor: "color-warning-default-border",
                dividerBackgroundColor: "color-warning-default",
              },
              danger: {
                borderColor: "color-danger-default-border",
                dividerBackgroundColor: "color-danger-default",
              },
              control: {
                borderColor: "color-control-default-border",
                dividerBackgroundColor: "color-control-default",
              },
            },
          },
        },
      },
    },
    Card: {
      meta: {
        scope: "all",
        parameters: {
          backgroundColor: {
            type: "string",
          },
          borderRadius: {
            type: "number",
          },
          borderColor: {
            type: "string",
          },
          borderWidth: {
            type: "number",
          },
          bodyPaddingHorizontal: {
            type: "number",
          },
          bodyPaddingVertical: {
            type: "number",
          },
          headerPaddingHorizontal: {
            type: "number",
          },
          headerPaddingVertical: {
            type: "number",
          },
          footerPaddingHorizontal: {
            type: "number",
          },
          footerPaddingVertical: {
            type: "number",
          },
          accentBackgroundColor: {
            type: "string",
          },
          accentHeight: {
            type: "number",
          },
        },
        appearances: {
          filled: {
            default: false,
          },
          outline: {
            default: true,
          },
        },
        variantGroups: {
          status: {
            basic: {
              default: false,
            },
            primary: {
              default: false,
            },
            success: {
              default: false,
            },
            info: {
              default: false,
            },
            warning: {
              default: false,
            },
            danger: {
              default: false,
            },
            control: {
              default: false,
            },
          },
        },
        states: {
          active: {
            default: false,
            priority: 0,
            scope: "all",
          },
        },
      },
      appearances: {
        outline: {
          mapping: {
            backgroundColor: "background-basic-color-1",
            borderRadius: "border-radius",
            borderColor: "border-basic-color-4",
            borderWidth: 0,
            accentHeight: 0,
            bodyPaddingHorizontal: 24,
            bodyPaddingVertical: 16,
            headerPaddingHorizontal: 24,
            headerPaddingVertical: 16,
            footerPaddingHorizontal: 24,
            footerPaddingVertical: 16,
            state: {
              active: {
                backgroundColor: "background-basic-color-2",
              },
            },
          },
          variantGroups: {
            status: {
              basic: {
                accentHeight: 4,
                accentBackgroundColor: "color-basic-default",
              },
              primary: {
                accentHeight: 4,
                accentBackgroundColor: "color-primary-default",
              },
              success: {
                accentHeight: 4,
                accentBackgroundColor: "color-success-default",
              },
              info: {
                accentHeight: 4,
                accentBackgroundColor: "color-info-default",
              },
              warning: {
                accentHeight: 4,
                accentBackgroundColor: "color-warning-default",
              },
              danger: {
                accentHeight: 4,
                accentBackgroundColor: "color-danger-default",
              },
              control: {
                accentHeight: 4,
                accentBackgroundColor: "color-control-default",
              },
            },
          },
        },
        filled: {
          mapping: {
            borderWidth: 0,
            borderColor: "transparent",
          },
        },
      },
    },
    Calendar: {
      meta: {
        scope: "all",
        parameters: {
          width: {
            type: "number",
          },
          paddingVertical: {
            type: "number",
          },
          borderColor: {
            type: "string",
          },
          borderWidth: {
            type: "number",
          },
          borderRadius: {
            type: "number",
          },
          headerPaddingHorizontal: {
            type: "number",
          },
          headerPaddingVertical: {
            type: "number",
          },
          dividerMarginVertical: {
            type: "number",
          },
          titleFontSize: {
            type: "number",
          },
          titleFontWeight: {
            type: "string",
          },
          titleColor: {
            type: "string",
          },
          titleFontFamily: {
            type: "string",
          },
          iconWidth: {
            type: "number",
          },
          iconHeight: {
            type: "number",
          },
          iconTintColor: {
            type: "string",
          },
          weekdayTextFontSize: {
            type: "number",
          },
          weekdayTextFontWeight: {
            type: "string",
          },
          weekdayTextColor: {
            type: "string",
          },
          weekdayTextFontFamily: {
            type: "string",
          },
          rowMinHeight: {
            type: "number",
          },
          rowMarginHorizontal: {
            type: "number",
          },
        },
        appearances: {
          default: {
            default: true,
          },
        },
        variantGroups: {},
        states: {},
      },
      appearances: {
        default: {
          mapping: {
            width: 344,
            borderRadius: "border-radius",
            borderWidth: "border-width",
            borderColor: "border-basic-color-4",
            paddingVertical: 8,
            headerPaddingHorizontal: 10,
            headerPaddingVertical: 4,
            titleFontSize: "text-heading-6-font-size",
            titleFontWeight: "text-heading-6-font-weight",
            titleFontFamily: "text-heading-6-font-family",
            titleColor: "text-basic-color",
            iconWidth: 24,
            iconHeight: 24,
            iconTintColor: "text-basic-color",
            weekdayTextFontSize: "text-subtitle-1-font-size",
            weekdayTextFontWeight: "text-subtitle-1-font-weight",
            weekdayTextFontFamily: "text-subtitle-1-font-family",
            weekdayTextColor: "text-hint-color",
            dividerMarginVertical: 4,
            rowMinHeight: 45,
            rowMarginHorizontal: 10,
          },
        },
      },
    },
    CalendarCell: {
      meta: {
        scope: "all",
        parameters: {
          paddingHorizontal: {
            type: "number",
          },
          paddingVertical: {
            type: "number",
          },
          backgroundColor: {
            type: "string",
          },
          borderRadius: {
            type: "string",
          },
          contentBorderWidth: {
            type: "number",
          },
          contentBorderRadius: {
            type: "string",
          },
          contentBorderColor: {
            type: "string",
          },
          contentBackgroundColor: {
            type: "string",
          },
          contentTextColor: {
            type: "string",
          },
          contentTextFontSize: {
            type: "number",
          },
          contentTextFontWeight: {
            type: "number",
          },
          contentTextFontFamily: {
            type: "string",
          },
        },
        appearances: {
          default: {
            default: true,
          },
        },
        variantGroups: {},
        states: {
          bounding: {
            scope: "all",
            priority: 0,
            default: false,
          },
          today: {
            scope: "all",
            priority: 1,
            default: false,
          },
          disabled: {
            scope: "all",
            priority: 2,
            default: false,
          },
          selected: {
            scope: "all",
            priority: 3,
            default: false,
          },
          range: {
            scope: "all",
            priority: 5,
            default: false,
          },
        },
      },
      appearances: {
        default: {
          mapping: {
            paddingHorizontal: 0,
            paddingVertical: 0,
            borderRadius: 0,
            backgroundColor: "transparent",
            contentBorderRadius: "border-radius",
            contentBorderWidth: "border-width",
            contentBorderColor: "transparent",
            contentTextFontSize: "text-subtitle-1-font-size",
            contentTextFontWeight: "text-subtitle-1-font-weight",
            contentTextFontFamily: "text-subtitle-1-font-family",
            contentTextColor: "text-basic-color",
            state: {
              bounding: {
                contentTextColor: "text-hint-color",
              },
              selected: {
                contentBorderColor: "color-primary-default-border",
                contentBackgroundColor: "color-primary-default",
                contentTextColor: "text-control-color",
              },
              disabled: {
                contentTextColor: "text-disabled-color",
              },
              today: {
                contentBorderColor: "color-primary-transparent-default-border",
                contentBackgroundColor: "color-primary-transparent-default",
              },
              range: {
                borderRadius: "border-radius",
                backgroundColor: "color-primary-default",
                contentTextColor: "text-control-color",
              },
              "today.range": {
                contentBorderColor: "color-control-transparent-default-border",
                contentBackgroundColor: "color-control-transparent-default",
              },
            },
          },
        },
      },
    },
    CheckBox: {
      meta: {
        scope: "all",
        parameters: {
          width: {
            type: "number",
          },
          height: {
            type: "number",
          },
          borderWidth: {
            type: "number",
          },
          borderRadius: {
            type: "number",
          },
          borderColor: {
            type: "string",
          },
          backgroundColor: {
            type: "string",
          },
          textMarginHorizontal: {
            type: "number",
          },
          textColor: {
            type: "string",
          },
          textFontFamily: {
            type: "string",
          },
          textFontSize: {
            type: "number",
          },
          textFontWeight: {
            type: "string",
          },
          iconWidth: {
            type: "number",
          },
          iconHeight: {
            type: "number",
          },
          iconTintColor: {
            type: "string",
          },
          outlineWidth: {
            type: "number",
          },
          outlineHeight: {
            type: "number",
          },
          outlineBorderRadius: {
            type: "number",
          },
          outlineBackgroundColor: {
            type: "string",
          },
        },
        appearances: {
          default: {
            default: true,
          },
        },
        variantGroups: {
          status: {
            primary: {
              default: false,
            },
            success: {
              default: false,
            },
            warning: {
              default: false,
            },
            danger: {
              default: false,
            },
            info: {
              default: false,
            },
            basic: {
              default: true,
            },
            control: {
              default: false,
            },
          },
        },
        states: {
          checked: {
            default: false,
            priority: 0,
            scope: "all",
          },
          hover: {
            default: false,
            priority: 1,
            scope: "all",
          },
          disabled: {
            default: false,
            priority: 2,
            scope: "all",
          },
          active: {
            default: false,
            priority: 3,
            scope: "all",
          },
          indeterminate: {
            default: false,
            priority: 4,
            scope: "all",
          },
          focused: {
            default: false,
            priority: 5,
            scope: "all",
          },
        },
      },
      appearances: {
        default: {
          mapping: {
            width: 20,
            height: 20,
            borderRadius: 3,
            borderWidth: "border-width",
            outlineWidth: 32,
            outlineHeight: 32,
            outlineBorderRadius: 6,
            outlineBackgroundColor: "transparent",
            textFontSize: "text-subtitle-2-font-size",
            textFontWeight: "text-subtitle-2-font-weight",
            textFontFamily: "text-subtitle-2-font-family",
            textMarginHorizontal: 12,
            iconWidth: 12,
            iconHeight: 12,
            iconTintColor: "transparent",
          },
          variantGroups: {
            status: {
              basic: {
                borderColor: "color-basic-transparent-default-border",
                backgroundColor: "color-basic-transparent-default",
                textColor: "text-basic-color",
                state: {
                  checked: {
                    borderColor: "color-primary-default-border",
                    backgroundColor: "color-primary-default",
                    iconTintColor: "text-control-color",
                  },
                  indeterminate: {
                    borderColor: "color-primary-default-border",
                    backgroundColor: "color-primary-default",
                    iconTintColor: "text-control-color",
                  },
                  focused: {
                    borderColor: "color-primary-transparent-focus-border",
                    backgroundColor: "color-primary-transparent-focus",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.focused": {
                    borderColor: "color-primary-focus-border",
                    backgroundColor: "color-primary-focus",
                  },
                  hover: {
                    borderColor: "color-primary-transparent-hover-border",
                    backgroundColor: "color-primary-transparent-hover",
                  },
                  "checked.hover": {
                    borderColor: "color-primary-hover-border",
                    backgroundColor: "color-primary-hover",
                  },
                  active: {
                    borderColor: "color-primary-transparent-active-border",
                    backgroundColor: "color-primary-transparent-active",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.active": {
                    borderColor: "color-primary-active-border",
                    backgroundColor: "color-primary-active",
                    outlineBackgroundColor: "outline-color",
                  },
                  disabled: {
                    borderColor: "color-basic-transparent-disabled-border",
                    backgroundColor: "color-basic-transparent-disabled",
                    textColor: "text-disabled-color",
                  },
                  "checked.disabled": {
                    borderColor: "color-basic-transparent-600",
                    backgroundColor: "color-basic-transparent-600",
                  },
                },
              },
              primary: {
                borderColor: "color-primary-transparent-default-border",
                backgroundColor: "color-primary-transparent-default",
                textColor: "text-basic-color",
                state: {
                  checked: {
                    borderColor: "color-primary-default-border",
                    backgroundColor: "color-primary-default",
                    iconTintColor: "text-control-color",
                  },
                  indeterminate: {
                    borderColor: "color-primary-default-border",
                    backgroundColor: "color-primary-default",
                    iconTintColor: "text-control-color",
                  },
                  focused: {
                    borderColor: "color-primary-transparent-focus-border",
                    backgroundColor: "color-primary-transparent-focus",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.focused": {
                    borderColor: "color-primary-focus-border",
                    backgroundColor: "color-primary-focus",
                  },
                  hover: {
                    borderColor: "color-primary-transparent-hover-border",
                    backgroundColor: "color-primary-transparent-hover",
                  },
                  "checked.hover": {
                    borderColor: "color-primary-hover-border",
                    backgroundColor: "color-primary-hover",
                  },
                  active: {
                    borderColor: "color-primary-transparent-active-border",
                    backgroundColor: "color-primary-transparent-active",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.active": {
                    borderColor: "color-primary-active-border",
                    backgroundColor: "color-primary-active",
                  },
                  disabled: {
                    borderColor: "color-basic-transparent-disabled-border",
                    backgroundColor: "color-basic-transparent-disabled",
                    textColor: "text-disabled-color",
                  },
                  "checked.disabled": {
                    borderColor: "color-basic-transparent-600",
                    backgroundColor: "color-basic-transparent-600",
                  },
                },
              },
              success: {
                borderColor: "color-success-transparent-default-border",
                backgroundColor: "color-success-transparent-default",
                textColor: "text-basic-color",
                state: {
                  checked: {
                    borderColor: "color-success-default-border",
                    backgroundColor: "color-success-default",
                    iconTintColor: "text-control-color",
                  },
                  indeterminate: {
                    borderColor: "color-success-default-border",
                    backgroundColor: "color-success-default",
                    iconTintColor: "text-control-color",
                  },
                  focused: {
                    borderColor: "color-success-transparent-focus-border",
                    backgroundColor: "color-success-transparent-focus",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.focused": {
                    borderColor: "color-success-focus-border",
                    backgroundColor: "color-success-focus",
                  },
                  hover: {
                    borderColor: "color-success-transparent-hover-border",
                    backgroundColor: "color-success-transparent-hover",
                  },
                  "checked.hover": {
                    borderColor: "color-success-hover-border",
                    backgroundColor: "color-success-hover",
                  },
                  active: {
                    borderColor: "color-success-transparent-active-border",
                    backgroundColor: "color-success-transparent-active",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.active": {
                    borderColor: "color-success-active-border",
                    backgroundColor: "color-success-active",
                  },
                  disabled: {
                    borderColor: "color-basic-transparent-disabled-border",
                    backgroundColor: "color-basic-transparent-disabled",
                    textColor: "text-disabled-color",
                  },
                  "checked.disabled": {
                    borderColor: "color-basic-transparent-600",
                    backgroundColor: "color-basic-transparent-600",
                  },
                },
              },
              info: {
                borderColor: "color-info-transparent-default-border",
                backgroundColor: "color-info-transparent-default",
                textColor: "text-basic-color",
                state: {
                  checked: {
                    borderColor: "color-info-default-border",
                    backgroundColor: "color-info-default",
                    iconTintColor: "text-control-color",
                  },
                  indeterminate: {
                    borderColor: "color-info-default-border",
                    backgroundColor: "color-info-default",
                    iconTintColor: "text-control-color",
                  },
                  focused: {
                    borderColor: "color-info-transparent-focus-border",
                    backgroundColor: "color-info-transparent-focus",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.focused": {
                    borderColor: "color-info-focus-border",
                    backgroundColor: "color-info-focus",
                  },
                  hover: {
                    borderColor: "color-info-transparent-hover-border",
                    backgroundColor: "color-info-transparent-hover",
                  },
                  "checked.hover": {
                    borderColor: "color-info-hover-border",
                    backgroundColor: "color-info-hover",
                  },
                  active: {
                    borderColor: "color-info-transparent-active-border",
                    backgroundColor: "color-info-transparent-active",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.active": {
                    borderColor: "color-info-active-border",
                    backgroundColor: "color-info-active",
                  },
                  disabled: {
                    borderColor: "color-basic-transparent-disabled-border",
                    backgroundColor: "color-basic-transparent-disabled",
                    textColor: "text-disabled-color",
                  },
                  "checked.disabled": {
                    borderColor: "color-basic-transparent-600",
                    backgroundColor: "color-basic-transparent-600",
                  },
                },
              },
              warning: {
                borderColor: "color-warning-transparent-default-border",
                backgroundColor: "color-warning-transparent-default",
                textColor: "text-basic-color",
                state: {
                  checked: {
                    borderColor: "color-warning-default-border",
                    backgroundColor: "color-warning-default",
                    iconTintColor: "text-control-color",
                  },
                  indeterminate: {
                    borderColor: "color-warning-default-border",
                    backgroundColor: "color-warning-default",
                    iconTintColor: "text-control-color",
                  },
                  focused: {
                    borderColor: "color-warning-transparent-focus-border",
                    backgroundColor: "color-warning-transparent-focus",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.focused": {
                    borderColor: "color-warning-focus-border",
                    backgroundColor: "color-warning-focus",
                  },
                  hover: {
                    borderColor: "color-warning-transparent-hover-border",
                    backgroundColor: "color-warning-transparent-hover",
                  },
                  "checked.hover": {
                    borderColor: "color-warning-hover-border",
                    backgroundColor: "color-warning-hover",
                  },
                  active: {
                    borderColor: "color-warning-transparent-active-border",
                    backgroundColor: "color-warning-transparent-active",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.active": {
                    borderColor: "color-warning-active-border",
                    backgroundColor: "color-warning-active",
                  },
                  disabled: {
                    borderColor: "color-basic-transparent-disabled-border",
                    backgroundColor: "color-basic-transparent-disabled",
                    textColor: "text-disabled-color",
                  },
                  "checked.disabled": {
                    borderColor: "color-basic-transparent-600",
                    backgroundColor: "color-basic-transparent-600",
                  },
                },
              },
              danger: {
                borderColor: "color-danger-transparent-default-border",
                backgroundColor: "color-danger-transparent-default",
                textColor: "text-basic-color",
                state: {
                  checked: {
                    borderColor: "color-danger-default-border",
                    backgroundColor: "color-danger-default",
                    iconTintColor: "text-control-color",
                  },
                  indeterminate: {
                    borderColor: "color-danger-default-border",
                    backgroundColor: "color-danger-default",
                    iconTintColor: "text-control-color",
                  },
                  focused: {
                    borderColor: "color-danger-transparent-focus-border",
                    backgroundColor: "color-danger-transparent-focus",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.focused": {
                    borderColor: "color-danger-focus-border",
                    backgroundColor: "color-danger-focus",
                  },
                  hover: {
                    borderColor: "color-danger-transparent-hover-border",
                    backgroundColor: "color-danger-transparent-hover",
                  },
                  "checked.hover": {
                    borderColor: "color-danger-hover-border",
                    backgroundColor: "color-danger-hover",
                  },
                  active: {
                    borderColor: "color-danger-transparent-active-border",
                    backgroundColor: "color-danger-transparent-active",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.active": {
                    borderColor: "color-danger-active-border",
                    backgroundColor: "color-danger-active",
                  },
                  disabled: {
                    borderColor: "color-basic-transparent-disabled-border",
                    backgroundColor: "color-basic-transparent-disabled",
                    textColor: "text-disabled-color",
                  },
                  "checked.disabled": {
                    borderColor: "color-basic-transparent-600",
                    backgroundColor: "color-basic-transparent-600",
                  },
                },
              },
              control: {
                borderColor: "color-control-transparent-default-border",
                backgroundColor: "color-control-transparent-default",
                textColor: "text-control-color",
                state: {
                  checked: {
                    borderColor: "color-control-default-border",
                    backgroundColor: "color-control-default",
                    iconTintColor: "color-basic-800",
                  },
                  indeterminate: {
                    borderColor: "color-control-default-border",
                    backgroundColor: "color-control-default",
                    iconTintColor: "color-basic-800",
                  },
                  focused: {
                    borderColor: "color-control-transparent-focus-border",
                    backgroundColor: "color-control-transparent-focus",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.focused": {
                    borderColor: "color-control-focus-border",
                    backgroundColor: "color-control-focus",
                  },
                  hover: {
                    borderColor: "color-control-transparent-hover-border",
                    backgroundColor: "color-control-transparent-hover",
                  },
                  "checked.hover": {
                    borderColor: "color-control-hover-border",
                    backgroundColor: "color-control-hover",
                  },
                  active: {
                    borderColor: "color-control-transparent-active-border",
                    backgroundColor: "color-control-transparent-active",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.active": {
                    borderColor: "color-control-active-border",
                    backgroundColor: "color-control-active",
                  },
                  disabled: {
                    borderColor: "color-control-transparent-disabled-border",
                    backgroundColor: "color-control-transparent-disabled",
                    textColor: "text-control-color",
                  },
                  "checked.disabled": {
                    borderColor: "color-basic-transparent-600",
                    backgroundColor: "color-basic-transparent-600",
                    iconTintColor: "text-control-color",
                  },
                },
              },
            },
          },
        },
      },
    },
    Datepicker: {
      meta: {
        scope: "all",
        parameters: {
          minHeight: {
            type: "number",
          },
          paddingHorizontal: {
            type: "number",
          },
          paddingVertical: {
            type: "number",
          },
          borderRadius: {
            type: "number",
          },
          borderColor: {
            type: "string",
          },
          borderWidth: {
            type: "number",
          },
          backgroundColor: {
            type: "string",
          },
          textMarginHorizontal: {
            type: "number",
          },
          textFontSize: {
            type: "number",
          },
          textFontWeight: {
            type: "string",
          },
          textFontFamily: {
            type: "string",
          },
          textColor: {
            type: "string",
          },
          placeholderColor: {
            type: "string",
          },
          iconWidth: {
            type: "number",
          },
          iconHeight: {
            type: "number",
          },
          iconMarginHorizontal: {
            type: "number",
          },
          iconTintColor: {
            type: "string",
          },
          labelColor: {
            type: "string",
          },
          labelFontFamily: {
            type: "string",
          },
          labelFontSize: {
            type: "number",
          },
          labelFontWeight: {
            type: "string",
          },
          labelMarginBottom: {
            type: "number",
          },
          captionMarginTop: {
            type: "number",
          },
          captionColor: {
            type: "string",
          },
          captionFontFamily: {
            type: "string",
          },
          captionFontSize: {
            type: "number",
          },
          captionFontWeight: {
            type: "string",
          },
          captionIconWidth: {
            type: "number",
          },
          captionIconHeight: {
            type: "number",
          },
          captionIconMarginRight: {
            type: "number",
          },
          captionIconTintColor: {
            type: "string",
          },
        },
        appearances: {
          default: {
            default: true,
          },
        },
        variantGroups: {
          status: {
            basic: {
              default: true,
            },
            primary: {
              default: false,
            },
            success: {
              default: false,
            },
            info: {
              default: false,
            },
            warning: {
              default: false,
            },
            danger: {
              default: false,
            },
            control: {
              default: false,
            },
          },
          size: {
            small: {
              default: false,
            },
            medium: {
              default: false,
            },
            large: {
              default: true,
            },
          },
        },
        states: {
          disabled: {
            default: false,
            priority: 0,
            scope: "all",
          },
          active: {
            default: false,
            priority: 1,
            scope: "all",
          },
        },
      },
      appearances: {
        default: {
          mapping: {
            paddingHorizontal: 8,
            textMarginHorizontal: 8,
            textFontFamily: "text-font-family",
            iconWidth: 24,
            iconHeight: 24,
            iconMarginHorizontal: 8,
            labelMarginBottom: 4,
            labelFontSize: "text-label-font-size",
            labelFontWeight: "text-label-font-weight",
            labelFontFamily: "text-label-font-family",
            captionMarginTop: 4,
            captionFontSize: "text-caption-1-font-size",
            captionFontWeight: "text-caption-1-font-weight",
            captionFontFamily: "text-caption-1-font-family",
            captionIconWidth: 10,
            captionIconHeight: 10,
            captionIconMarginRight: 8,
          },
          variantGroups: {
            status: {
              basic: {
                borderColor: "border-basic-color-4",
                backgroundColor: "background-basic-color-2",
                textColor: "text-hint-color",
                labelColor: "text-hint-color",
                captionColor: "text-hint-color",
                placeholderColor: "text-hint-color",
                iconTintColor: "text-hint-color",
                captionIconTintColor: "text-hint-color",
                state: {
                  active: {
                    borderColor: "color-primary-default",
                    backgroundColor: "background-basic-color-1",
                    textColor: "text-basic-color",
                  },
                  disabled: {
                    borderColor: "border-basic-color-4",
                    backgroundColor: "background-basic-color-2",
                    textColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                  },
                },
              },
              primary: {
                borderColor: "color-primary-default",
                backgroundColor: "background-basic-color-2",
                textColor: "text-basic-color",
                labelColor: "text-hint-color",
                captionColor: "text-primary-color",
                placeholderColor: "text-hint-color",
                iconTintColor: "text-primary-color",
                captionIconTintColor: "text-primary-color",
                state: {
                  active: {
                    borderColor: "color-primary-active",
                    backgroundColor: "background-basic-color-1",
                    textColor: "text-basic-color",
                  },
                  disabled: {
                    borderColor: "border-basic-color-4",
                    backgroundColor: "background-basic-color-2",
                    textColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                  },
                },
              },
              success: {
                borderColor: "color-success-default",
                backgroundColor: "background-basic-color-2",
                textColor: "text-basic-color",
                labelColor: "text-hint-color",
                captionColor: "text-success-color",
                placeholderColor: "text-hint-color",
                iconTintColor: "text-success-color",
                captionIconTintColor: "text-success-color",
                state: {
                  active: {
                    borderColor: "color-success-active",
                    backgroundColor: "background-basic-color-1",
                    textColor: "text-basic-color",
                  },
                  disabled: {
                    borderColor: "border-basic-color-4",
                    backgroundColor: "background-basic-color-2",
                    textColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                  },
                },
              },
              info: {
                borderColor: "color-info-default",
                backgroundColor: "background-basic-color-2",
                textColor: "text-basic-color",
                labelColor: "text-hint-color",
                captionColor: "text-info-color",
                placeholderColor: "text-hint-color",
                iconTintColor: "text-info-color",
                captionIconTintColor: "text-info-color",
                state: {
                  active: {
                    borderColor: "color-info-active",
                    backgroundColor: "background-basic-color-1",
                    textColor: "text-basic-color",
                  },
                  disabled: {
                    borderColor: "border-basic-color-4",
                    backgroundColor: "background-basic-color-2",
                    textColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                  },
                },
              },
              warning: {
                borderColor: "color-warning-default",
                backgroundColor: "background-basic-color-2",
                textColor: "text-basic-color",
                labelColor: "text-hint-color",
                captionColor: "text-warning-color",
                placeholderColor: "text-hint-color",
                iconTintColor: "text-warning-color",
                captionIconTintColor: "text-warning-color",
                state: {
                  active: {
                    borderColor: "color-warning-active",
                    backgroundColor: "background-basic-color-1",
                    textColor: "text-basic-color",
                  },
                  disabled: {
                    borderColor: "border-basic-color-4",
                    backgroundColor: "background-basic-color-2",
                    textColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                  },
                },
              },
              danger: {
                borderColor: "color-danger-default",
                backgroundColor: "background-basic-color-2",
                textColor: "text-basic-color",
                labelColor: "text-hint-color",
                captionColor: "text-danger-color",
                placeholderColor: "text-hint-color",
                iconTintColor: "text-danger-color",
                captionIconTintColor: "text-danger-color",
                state: {
                  active: {
                    borderColor: "color-danger-active",
                    backgroundColor: "background-basic-color-1",
                    textColor: "text-basic-color",
                  },
                  disabled: {
                    borderColor: "border-basic-color-4",
                    backgroundColor: "background-basic-color-2",
                    textColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                  },
                },
              },
              control: {
                borderColor: "color-basic-control-transparent-500",
                backgroundColor: "color-basic-control-transparent-300",
                textColor: "text-control-color",
                labelColor: "text-control-color",
                captionColor: "text-control-color",
                placeholderColor: "text-control-color",
                iconTintColor: "text-control-color",
                captionIconTintColor: "text-control-color",
                state: {
                  active: {
                    borderColor: "color-control-transparent-active-border",
                    backgroundColor: "background-basic-color-1",
                    textColor: "text-basic-color",
                  },
                  disabled: {
                    borderColor: "color-control-transparent-disabled-border",
                    backgroundColor: "color-control-transparent-disabled",
                    textColor: "text-control-color",
                    iconTintColor: "text-control-color",
                  },
                },
              },
            },
            size: {
              small: {
                minHeight: "size-small",
                borderRadius: "border-radius",
                borderWidth: "border-width",
                paddingVertical: 3,
                textFontSize: "text-subtitle-2-font-size",
                textFontWeight: "normal",
              },
              medium: {
                minHeight: "size-medium",
                borderRadius: "border-radius",
                borderWidth: "border-width",
                paddingVertical: 7,
                textFontSize: "text-subtitle-1-font-size",
                textFontWeight: "normal",
              },
              large: {
                minHeight: "size-large",
                borderRadius: "border-radius",
                borderWidth: "border-width",
                paddingVertical: 11,
                textFontSize: "text-subtitle-1-font-size",
                textFontWeight: "normal",
              },
            },
          },
        },
      },
    },
    Divider: {
      meta: {
        scope: "all",
        parameters: {
          backgroundColor: {
            type: "string",
          },
          height: {
            type: "number",
          },
        },
        appearances: {
          default: {
            default: true,
          },
        },
        variantGroups: {},
        states: {},
      },
      appearances: {
        default: {
          mapping: {
            height: 1,
            backgroundColor: "background-basic-color-3",
          },
        },
      },
    },
    Drawer: {
      meta: {
        scope: "mobile",
        parameters: {
          backgroundColor: {
            type: "string",
          },
          headerPaddingHorizontal: {
            type: "number",
          },
          headerPaddingVertical: {
            type: "number",
          },
          footerPaddingHorizontal: {
            type: "number",
          },
          footerPaddingVertical: {
            type: "number",
          },
        },
        appearances: {
          default: {
            default: true,
          },
          noDivider: {
            default: false,
          },
        },
        variantGroups: {},
        states: {},
      },
      appearances: {
        default: {
          mapping: {
            backgroundColor: "background-basic-color-1",
            headerPaddingHorizontal: 24,
            headerPaddingVertical: 16,
            footerPaddingHorizontal: 24,
            footerPaddingVertical: 8,
          },
        },
        noDivider: {
          mapping: {},
        },
      },
    },
    Input: {
      meta: {
        scope: "all",
        parameters: {
          paddingVertical: {
            type: "number",
          },
          paddingHorizontal: {
            type: "number",
          },
          minHeight: {
            type: "number",
          },
          borderRadius: {
            type: "number",
          },
          borderWidth: {
            type: "number",
          },
          borderColor: {
            type: "string",
          },
          backgroundColor: {
            type: "string",
          },
          textMarginHorizontal: {
            type: "number",
          },
          textFontFamily: {
            type: "string",
          },
          textFontSize: {
            type: "number",
          },
          textFontWeight: {
            type: "string",
          },
          textColor: {
            type: "string",
          },
          placeholderColor: {
            type: "string",
          },
          iconWidth: {
            type: "number",
          },
          iconHeight: {
            type: "number",
          },
          iconMarginHorizontal: {
            type: "number",
          },
          iconTintColor: {
            type: "string",
          },
          labelColor: {
            type: "string",
          },
          labelFontFamily: {
            type: "string",
          },
          labelFontSize: {
            type: "number",
          },
          labelFontWeight: {
            type: "string",
          },
          labelMarginBottom: {
            type: "number",
          },
          captionMarginTop: {
            type: "number",
          },
          captionColor: {
            type: "string",
          },
          captionFontFamily: {
            type: "string",
          },
          captionFontSize: {
            type: "number",
          },
          captionFontWeight: {
            type: "string",
          },
          captionIconWidth: {
            type: "number",
          },
          captionIconHeight: {
            type: "number",
          },
          captionIconMarginRight: {
            type: "number",
          },
          captionIconTintColor: {
            type: "string",
          },
        },
        appearances: {
          default: {
            default: true,
          },
        },
        variantGroups: {
          status: {
            basic: {
              default: true,
            },
            primary: {
              default: false,
            },
            success: {
              default: false,
            },
            info: {
              default: false,
            },
            warning: {
              default: false,
            },
            danger: {
              default: false,
            },
            control: {
              default: false,
            },
          },
          size: {
            small: {
              default: false,
            },
            medium: {
              default: false,
            },
            large: {
              default: true,
            },
          },
        },
        states: {
          hover: {
            default: false,
            priority: 0,
            scope: "all",
          },
          disabled: {
            default: false,
            priority: 1,
            scope: "all",
          },
          focused: {
            default: false,
            priority: 2,
            scope: "all",
          },
        },
      },
      appearances: {
        default: {
          mapping: {
            paddingHorizontal: 8,
            textMarginHorizontal: 8,
            textFontFamily: "text-font-family",
            iconWidth: 24,
            iconHeight: 24,
            iconMarginHorizontal: 8,
            labelMarginBottom: 4,
            labelFontSize: "text-label-font-size",
            labelFontWeight: "text-label-font-weight",
            labelFontFamily: "text-label-font-family",
            captionMarginTop: 4,
            captionFontSize: "text-caption-1-font-size",
            captionFontWeight: "text-caption-1-font-weight",
            captionFontFamily: "text-caption-1-font-family",
            captionIconWidth: 10,
            captionIconHeight: 10,
            captionIconMarginRight: 8,
          },
          variantGroups: {
            status: {
              basic: {
                borderColor: "border-basic-color-4",
                backgroundColor: "background-basic-color-2",
                textColor: "text-basic-color",
                labelColor: "text-hint-color",
                captionColor: "text-hint-color",
                placeholderColor: "text-hint-color",
                iconTintColor: "text-hint-color",
                captionIconTintColor: "text-hint-color",
                state: {
                  focused: {
                    borderColor: "color-primary-default",
                    backgroundColor: "background-basic-color-1",
                    iconTintColor: "text-primary-color",
                  },
                  hover: {
                    borderColor: "border-basic-color-4",
                    backgroundColor: "background-basic-color-3",
                  },
                  disabled: {
                    borderColor: "border-basic-color-4",
                    backgroundColor: "background-basic-color-2",
                    textColor: "text-disabled-color",
                    labelColor: "text-disabled-color",
                    captionColor: "text-disabled-color",
                    placeholderColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                    captionIconTintColor: "text-disabled-color",
                  },
                },
              },
              primary: {
                borderColor: "color-primary-default",
                backgroundColor: "background-basic-color-2",
                textColor: "text-basic-color",
                labelColor: "text-hint-color",
                captionColor: "text-primary-color",
                placeholderColor: "text-hint-color",
                iconTintColor: "text-primary-color",
                captionIconTintColor: "text-primary-color",
                state: {
                  focused: {
                    borderColor: "color-primary-focus",
                    backgroundColor: "background-basic-color-1",
                    iconTintColor: "text-primary-focus-color",
                  },
                  hover: {
                    borderColor: "color-primary-hover",
                    backgroundColor: "background-basic-color-3",
                  },
                  disabled: {
                    borderColor: "border-basic-color-4",
                    backgroundColor: "background-basic-color-2",
                    textColor: "text-disabled-color",
                    labelColor: "text-disabled-color",
                    captionColor: "text-disabled-color",
                    placeholderColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                    captionIconTintColor: "text-disabled-color",
                  },
                },
              },
              success: {
                borderColor: "color-success-default",
                backgroundColor: "background-basic-color-2",
                textColor: "text-basic-color",
                labelColor: "text-hint-color",
                captionColor: "text-success-color",
                placeholderColor: "text-hint-color",
                iconTintColor: "text-success-color",
                captionIconTintColor: "text-success-color",
                state: {
                  focused: {
                    borderColor: "color-success-focus",
                    backgroundColor: "background-basic-color-1",
                    iconTintColor: "text-success-focus-color",
                  },
                  hover: {
                    borderColor: "color-success-hover",
                    backgroundColor: "background-basic-color-3",
                  },
                  disabled: {
                    borderColor: "border-basic-color-4",
                    backgroundColor: "background-basic-color-2",
                    textColor: "text-disabled-color",
                    labelColor: "text-disabled-color",
                    captionColor: "text-disabled-color",
                    placeholderColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                    captionIconTintColor: "text-disabled-color",
                  },
                },
              },
              info: {
                borderColor: "color-info-default",
                backgroundColor: "background-basic-color-2",
                textColor: "text-basic-color",
                labelColor: "text-hint-color",
                captionColor: "text-info-color",
                placeholderColor: "text-hint-color",
                iconTintColor: "text-info-color",
                captionIconTintColor: "text-info-color",
                state: {
                  focused: {
                    borderColor: "color-info-focus",
                    backgroundColor: "background-basic-color-1",
                    iconTintColor: "text-info-focus-color",
                  },
                  hover: {
                    borderColor: "color-info-hover",
                    backgroundColor: "background-basic-color-3",
                  },
                  disabled: {
                    borderColor: "border-basic-color-4",
                    backgroundColor: "background-basic-color-2",
                    textColor: "text-disabled-color",
                    labelColor: "text-disabled-color",
                    captionColor: "text-disabled-color",
                    placeholderColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                    captionIconTintColor: "text-disabled-color",
                  },
                },
              },
              warning: {
                borderColor: "color-warning-default",
                backgroundColor: "background-basic-color-2",
                textColor: "text-basic-color",
                labelColor: "text-hint-color",
                captionColor: "text-warning-color",
                placeholderColor: "text-hint-color",
                iconTintColor: "text-warning-color",
                captionIconTintColor: "text-warning-color",
                state: {
                  focused: {
                    borderColor: "color-warning-focus",
                    backgroundColor: "background-basic-color-1",
                    iconTintColor: "text-warning-focus-color",
                  },
                  hover: {
                    borderColor: "color-warning-hover",
                    backgroundColor: "background-basic-color-3",
                  },
                  disabled: {
                    borderColor: "border-basic-color-4",
                    backgroundColor: "background-basic-color-2",
                    textColor: "text-disabled-color",
                    labelColor: "text-disabled-color",
                    captionColor: "text-disabled-color",
                    placeholderColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                    captionIconTintColor: "text-disabled-color",
                  },
                },
              },
              danger: {
                borderColor: "color-danger-default",
                backgroundColor: "background-basic-color-2",
                textColor: "text-basic-color",
                labelColor: "text-hint-color",
                captionColor: "text-danger-color",
                placeholderColor: "text-hint-color",
                iconTintColor: "text-danger-color",
                captionIconTintColor: "text-danger-color",
                state: {
                  focused: {
                    borderColor: "color-danger-focus",
                    backgroundColor: "background-basic-color-1",
                    iconTintColor: "text-danger-focus-color",
                  },
                  hover: {
                    borderColor: "color-danger-hover",
                    backgroundColor: "background-basic-color-3",
                  },
                  disabled: {
                    borderColor: "border-basic-color-4",
                    backgroundColor: "background-basic-color-2",
                    textColor: "text-disabled-color",
                    labelColor: "text-disabled-color",
                    captionColor: "text-disabled-color",
                    placeholderColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                    captionIconTintColor: "text-disabled-color",
                  },
                },
              },
              control: {
                borderColor: "color-basic-control-transparent-500",
                backgroundColor: "color-basic-control-transparent-300",
                textColor: "text-control-color",
                labelColor: "text-control-color",
                captionColor: "text-control-color",
                placeholderColor: "text-control-color",
                iconTintColor: "text-control-color",
                captionIconTintColor: "text-control-color",
                state: {
                  focused: {
                    borderColor: "color-control-transparent-focus-border",
                    backgroundColor: "color-basic-control-transparent-500",
                    iconTintColor: "text-control-color",
                  },
                  hover: {
                    borderColor: "color-control-transparent-hover-border",
                    backgroundColor: "color-basic-control-transparent-400",
                  },
                  disabled: {
                    borderColor: "color-control-transparent-disabled-border",
                    backgroundColor: "color-control-transparent-disabled",
                    textColor: "text-control-color",
                    labelColor: "text-control-color",
                    captionColor: "text-control-color",
                    placeholderColor: "text-control-color",
                    iconTintColor: "text-control-color",
                    captionIconTintColor: "text-control-color",
                  },
                },
              },
            },
            size: {
              small: {
                minHeight: "size-small",
                borderRadius: "border-radius",
                borderWidth: "border-width",
                paddingVertical: 3,
                textFontSize: "text-subtitle-2-font-size",
                textFontWeight: "normal",
              },
              medium: {
                minHeight: "size-medium",
                borderRadius: "border-radius",
                borderWidth: "border-width",
                paddingVertical: 7,
                textFontSize: "text-subtitle-1-font-size",
                textFontWeight: "normal",
              },
              large: {
                minHeight: "size-large",
                borderRadius: "border-radius",
                borderWidth: "border-width",
                paddingVertical: 11,
                textFontSize: "text-subtitle-1-font-size",
                textFontWeight: "normal",
              },
            },
          },
        },
      },
    },
    Layout: {
      meta: {
        scope: "mobile",
        parameters: {
          backgroundColor: {
            type: "string",
          },
        },
        appearances: {
          default: {
            default: true,
          },
        },
        variantGroups: {
          level: {
            "1": {
              default: true,
            },
            "2": {
              default: false,
            },
            "3": {
              default: false,
            },
            "4": {
              default: false,
            },
          },
        },
        states: {},
      },
      appearances: {
        default: {
          mapping: {},
          variantGroups: {
            level: {
              "1": {
                backgroundColor: "background-basic-color-1",
              },
              "2": {
                backgroundColor: "background-basic-color-2",
              },
              "3": {
                backgroundColor: "background-basic-color-3",
              },
              "4": {
                backgroundColor: "background-basic-color-4",
              },
            },
          },
        },
      },
    },
    List: {
      meta: {
        scope: "all",
        parameters: {
          backgroundColor: {
            type: "string",
          },
        },
        appearances: {
          default: {
            default: true,
          },
        },
        variantGroups: {},
        states: {},
      },
      appearances: {
        default: {
          mapping: {
            backgroundColor: "background-basic-color-2",
          },
        },
      },
    },
    ListItem: {
      meta: {
        scope: "all",
        parameters: {
          paddingVertical: {
            type: "number",
          },
          paddingHorizontal: {
            type: "number",
          },
          backgroundColor: {
            type: "string",
          },
          iconWidth: {
            type: "number",
          },
          iconHeight: {
            type: "number",
          },
          iconMarginHorizontal: {
            type: "number",
          },
          iconTintColor: {
            type: "string",
          },
          titleMarginHorizontal: {
            type: "number",
          },
          titleFontFamily: {
            type: "string",
          },
          titleFontSize: {
            type: "number",
          },
          titleFontWeight: {
            type: "string",
          },
          titleColor: {
            type: "string",
          },
          descriptionColor: {
            type: "string",
          },
          descriptionFontFamily: {
            type: "string",
          },
          descriptionFontSize: {
            type: "number",
          },
          descriptionFontWeight: {
            type: "string",
          },
          descriptionMarginHorizontal: {
            type: "number",
          },
          accessoryMarginHorizontal: {
            type: "number",
          },
        },
        appearances: {
          default: {
            default: true,
          },
        },
        variantGroups: {},
        states: {
          active: {
            default: false,
            priority: 0,
            scope: "all",
          },
        },
      },
      appearances: {
        default: {
          mapping: {
            paddingHorizontal: 8,
            paddingVertical: 12,
            backgroundColor: "background-basic-color-1",
            iconWidth: 24,
            iconHeight: 24,
            iconMarginHorizontal: 8,
            iconTintColor: "text-hint-color",
            titleMarginHorizontal: 8,
            titleFontSize: "text-subtitle-2-font-size",
            titleFontWeight: "text-subtitle-2-font-weight",
            titleFontFamily: "text-subtitle-2-font-family",
            titleColor: "text-basic-color",
            descriptionMarginHorizontal: 8,
            descriptionFontSize: "text-caption-1-font-size",
            descriptionFontWeight: "text-caption-1-font-weight",
            descriptionFontFamily: "text-caption-1-font-family",
            descriptionColor: "text-hint-color",
            accessoryMarginHorizontal: 8,
            state: {
              active: {
                backgroundColor: "color-basic-transparent-active",
              },
            },
          },
        },
      },
    },
    Menu: {
      meta: {
        scope: "all",
        parameters: {},
        appearances: {
          default: {
            default: true,
          },
          noDivider: {
            default: false,
          },
        },
        variantGroups: {},
        states: {},
      },
      appearances: {
        default: {
          mapping: {},
        },
        noDivider: {
          mapping: {},
        },
      },
    },
    MenuItem: {
      meta: {
        scope: "all",
        parameters: {
          indicatorWidth: {
            type: "number",
          },
          indicatorBackgroundColor: {
            type: "string",
          },
          paddingVertical: {
            type: "number",
          },
          paddingHorizontal: {
            type: "number",
          },
          paddingLeft: {
            type: "number",
          },
          backgroundColor: {
            type: "string",
          },
          iconWidth: {
            type: "number",
          },
          iconHeight: {
            type: "number",
          },
          iconMarginHorizontal: {
            type: "number",
          },
          iconTintColor: {
            type: "string",
          },
          titleMarginHorizontal: {
            type: "number",
          },
          titleFontFamily: {
            type: "string",
          },
          titleFontSize: {
            type: "number",
          },
          titleFontWeight: {
            type: "string",
          },
          titleColor: {
            type: "string",
          },
        },
        appearances: {
          default: {
            default: true,
          },
          grouped: {
            default: false,
          },
        },
        variantGroups: {},
        states: {
          hover: {
            default: false,
            priority: 0,
            scope: "all",
          },
          disabled: {
            default: false,
            priority: 1,
            scope: "all",
          },
          selected: {
            default: false,
            priority: 2,
            scope: "all",
          },
          active: {
            default: false,
            priority: 3,
            scope: "all",
          },
          focused: {
            default: false,
            priority: 4,
            scope: "all",
          },
        },
      },
      appearances: {
        default: {
          mapping: {
            paddingHorizontal: 8,
            paddingVertical: 12,
            backgroundColor: "background-basic-color-1",
            indicatorWidth: 0,
            indicatorBackgroundColor: "transparent",
            titleMarginHorizontal: 8,
            titleFontSize: "text-subtitle-2-font-size",
            titleFontWeight: "text-subtitle-2-font-weight",
            titleFontFamily: "text-subtitle-2-font-family",
            titleColor: "text-basic-color",
            iconWidth: 20,
            iconHeight: 20,
            iconMarginHorizontal: 8,
            iconTintColor: "text-hint-color",
            state: {
              hover: {
                titleColor: "text-primary-hover-color",
                iconTintColor: "text-primary-hover-color",
              },
              active: {
                backgroundColor: "color-basic-transparent-active",
              },
              selected: {
                backgroundColor: "color-primary-transparent-default",
                indicatorWidth: 4,
                indicatorBackgroundColor: "color-primary-default",
                titleColor: "text-primary-color",
                iconTintColor: "text-primary-color",
              },
              disabled: {
                titleColor: "text-disabled-color",
                iconTintColor: "text-disabled-color",
              },
            },
          },
        },
        grouped: {
          mapping: {
            paddingLeft: 16,
          },
        },
      },
    },
    OverflowMenu: {
      meta: {
        scope: "all",
        parameters: {
          width: {
            type: "number",
          },
          maxHeight: {
            type: "number",
          },
          borderRadius: {
            type: "number",
          },
          indicatorBackgroundColor: {
            type: "string",
          },
        },
        appearances: {
          default: {
            default: true,
          },
          noDivider: {
            default: false,
          },
        },
        states: {},
        variantGroups: {},
      },
      appearances: {
        default: {
          mapping: {
            maxHeight: 256,
            borderRadius: "border-radius",
            indicatorBackgroundColor: "transparent",
          },
        },
        noDivider: {
          mapping: {},
        },
      },
    },
    Popover: {
      meta: {
        scope: "all",
        parameters: {
          borderRadius: {
            type: "number",
          },
          borderWidth: {
            type: "number",
          },
          borderColor: {
            type: "number",
          },
          backgroundColor: {
            type: "string",
          },
          indicatorWidth: {
            type: "number",
          },
          indicatorHeight: {
            type: "number",
          },
          indicatorBackgroundColor: {
            type: "string",
          },
        },
        appearances: {
          default: {
            default: true,
          },
        },
        variantGroups: {},
        states: {},
      },
      appearances: {
        default: {
          mapping: {
            borderRadius: "border-radius",
            borderWidth: "border-width",
            borderColor: "border-basic-color-3",
            backgroundColor: "background-basic-color-2",
            indicatorWidth: 6,
            indicatorHeight: 6,
            indicatorBackgroundColor: "background-basic-color-2",
          },
        },
      },
    },
    Select: {
      meta: {
        scope: "all",
        parameters: {
          minWidth: {
            type: "number",
          },
          minHeight: {
            type: "number",
          },
          paddingHorizontal: {
            type: "number",
          },
          paddingVertical: {
            type: "number",
          },
          borderRadius: {
            type: "number",
          },
          borderColor: {
            type: "string",
          },
          borderWidth: {
            type: "number",
          },
          backgroundColor: {
            type: "string",
          },
          placeholderMarginHorizontal: {
            type: "number",
          },
          placeholderFontFamily: {
            type: "string",
          },
          placeholderFontSize: {
            type: "number",
          },
          placeholderFontWeight: {
            type: "string",
          },
          placeholderColor: {
            type: "string",
          },
          textMarginHorizontal: {
            type: "number",
          },
          textFontFamily: {
            type: "string",
          },
          textFontSize: {
            type: "number",
          },
          textFontWeight: {
            type: "string",
          },
          textColor: {
            type: "string",
          },
          iconWidth: {
            type: "number",
          },
          iconHeight: {
            type: "number",
          },
          iconTintColor: {
            type: "string",
          },
          iconMarginHorizontal: {
            type: "number",
          },
          popoverMaxHeight: {
            type: "number",
          },
          popoverBorderRadius: {
            type: "number",
          },
          popoverBorderColor: {
            type: "string",
          },
          popoverBorderWidth: {
            type: "number",
          },
          labelColor: {
            type: "string",
          },
          labelFontFamily: {
            type: "string",
          },
          labelFontSize: {
            type: "number",
          },
          labelFontWeight: {
            type: "string",
          },
          labelMarginBottom: {
            type: "number",
          },
          captionMarginTop: {
            type: "number",
          },
          captionColor: {
            type: "string",
          },
          captionFontFamily: {
            type: "string",
          },
          captionFontSize: {
            type: "number",
          },
          captionFontWeight: {
            type: "number",
          },
        },
        appearances: {
          default: {
            default: true,
          },
        },
        variantGroups: {
          status: {
            basic: {
              default: true,
            },
            primary: {
              default: false,
            },
            success: {
              default: false,
            },
            info: {
              default: false,
            },
            warning: {
              default: false,
            },
            danger: {
              default: false,
            },
            control: {
              default: false,
            },
          },
          size: {
            small: {
              default: false,
            },
            medium: {
              default: false,
            },
            large: {
              default: true,
            },
          },
        },
        states: {
          hover: {
            default: false,
            priority: 0,
            scope: "all",
          },
          disabled: {
            default: false,
            priority: 1,
            scope: "all",
          },
          active: {
            default: false,
            priority: 2,
            scope: "all",
          },
          focused: {
            default: false,
            priority: 3,
            scope: "all",
          },
        },
      },
      appearances: {
        default: {
          mapping: {
            paddingHorizontal: 8,
            iconWidth: 24,
            iconHeight: 24,
            iconMarginHorizontal: 8,
            placeholderMarginHorizontal: 8,
            textMarginHorizontal: 8,
            textFontFamily: "text-subtitle-2-font-family",
            placeholderFontFamily: "text-paragraph-1-font-family",
            labelMarginBottom: 4,
            labelFontSize: "text-label-font-size",
            labelFontWeight: "text-label-font-weight",
            labelFontFamily: "text-label-font-family",
            captionMarginTop: 4,
            captionFontSize: "text-caption-1-font-size",
            captionFontWeight: "text-caption-1-font-weight",
            captionFontFamily: "text-caption-1-font-family",
            popoverMaxHeight: 220,
            popoverBorderRadius: "border-radius",
            popoverBorderWidth: "border-width",
            popoverBorderColor: "border-basic-color-4",
          },
          variantGroups: {
            status: {
              basic: {
                borderColor: "border-basic-color-4",
                backgroundColor: "background-basic-color-2",
                textColor: "text-basic-color",
                labelColor: "text-hint-color",
                captionColor: "text-hint-color",
                placeholderColor: "text-hint-color",
                iconTintColor: "text-hint-color",
                state: {
                  focused: {
                    borderColor: "color-primary-default",
                    backgroundColor: "background-basic-color-1",
                  },
                  hover: {
                    borderColor: "border-basic-color-4",
                    backgroundColor: "background-basic-color-3",
                  },
                  active: {
                    borderColor: "color-primary-default",
                    backgroundColor: "background-basic-color-1",
                  },
                  disabled: {
                    borderColor: "border-basic-color-4",
                    backgroundColor: "background-basic-color-2",
                    textColor: "text-disabled-color",
                    labelColor: "text-disabled-color",
                    captionColor: "text-disabled-color",
                    placeholderColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                    captionIconTintColor: "text-disabled-color",
                  },
                },
              },
              primary: {
                borderColor: "color-primary-default",
                backgroundColor: "background-basic-color-2",
                textColor: "text-basic-color",
                labelColor: "text-hint-color",
                captionColor: "text-primary-color",
                placeholderColor: "text-hint-color",
                iconTintColor: "text-hint-color",
                state: {
                  focused: {
                    borderColor: "color-primary-focus",
                    backgroundColor: "background-basic-color-1",
                  },
                  hover: {
                    borderColor: "color-primary-hover",
                    backgroundColor: "background-basic-color-3",
                  },
                  active: {
                    borderColor: "color-primary-active",
                    backgroundColor: "background-basic-color-1",
                    iconTintColor: "text-basic-color",
                  },
                  disabled: {
                    borderColor: "border-basic-color-4",
                    backgroundColor: "background-basic-color-2",
                    textColor: "text-disabled-color",
                    labelColor: "text-disabled-color",
                    captionColor: "text-disabled-color",
                    placeholderColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                    captionIconTintColor: "text-disabled-color",
                  },
                },
              },
              success: {
                borderColor: "color-success-default",
                backgroundColor: "background-basic-color-2",
                textColor: "text-basic-color",
                labelColor: "text-hint-color",
                captionColor: "text-success-color",
                placeholderColor: "text-hint-color",
                iconTintColor: "text-hint-color",
                state: {
                  focused: {
                    borderColor: "color-success-focus",
                    backgroundColor: "background-basic-color-1",
                  },
                  hover: {
                    borderColor: "color-success-hover",
                    backgroundColor: "background-basic-color-3",
                  },
                  active: {
                    borderColor: "color-success-active",
                    backgroundColor: "background-basic-color-1",
                    iconTintColor: "text-basic-color",
                  },
                  disabled: {
                    borderColor: "border-basic-color-4",
                    backgroundColor: "background-basic-color-2",
                    textColor: "text-disabled-color",
                    labelColor: "text-disabled-color",
                    captionColor: "text-disabled-color",
                    placeholderColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                    captionIconTintColor: "text-disabled-color",
                  },
                },
              },
              info: {
                borderColor: "color-info-default",
                backgroundColor: "background-basic-color-2",
                textColor: "text-basic-color",
                labelColor: "text-hint-color",
                captionColor: "text-info-color",
                placeholderColor: "text-hint-color",
                iconTintColor: "text-hint-color",
                state: {
                  focused: {
                    borderColor: "color-info-focus",
                    backgroundColor: "background-basic-color-1",
                  },
                  hover: {
                    borderColor: "color-info-hover",
                    backgroundColor: "background-basic-color-3",
                  },
                  active: {
                    borderColor: "color-info-active",
                    backgroundColor: "background-basic-color-1",
                    iconTintColor: "text-basic-color",
                  },
                  disabled: {
                    borderColor: "border-basic-color-4",
                    backgroundColor: "background-basic-color-2",
                    textColor: "text-disabled-color",
                    labelColor: "text-disabled-color",
                    captionColor: "text-disabled-color",
                    placeholderColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                    captionIconTintColor: "text-disabled-color",
                  },
                },
              },
              warning: {
                borderColor: "color-warning-default",
                backgroundColor: "background-basic-color-2",
                textColor: "text-basic-color",
                labelColor: "text-hint-color",
                captionColor: "text-warning-color",
                placeholderColor: "text-hint-color",
                iconTintColor: "text-hint-color",
                state: {
                  focused: {
                    borderColor: "color-warning-focus",
                    backgroundColor: "background-basic-color-1",
                  },
                  hover: {
                    borderColor: "color-warning-hover",
                    backgroundColor: "background-basic-color-3",
                  },
                  active: {
                    borderColor: "color-warning-active",
                    backgroundColor: "background-basic-color-1",
                    iconTintColor: "text-basic-color",
                  },
                  disabled: {
                    borderColor: "border-basic-color-4",
                    backgroundColor: "background-basic-color-2",
                    textColor: "text-disabled-color",
                    labelColor: "text-disabled-color",
                    captionColor: "text-disabled-color",
                    placeholderColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                    captionIconTintColor: "text-disabled-color",
                  },
                },
              },
              danger: {
                borderColor: "color-danger-default",
                backgroundColor: "background-basic-color-2",
                textColor: "text-basic-color",
                labelColor: "text-hint-color",
                captionColor: "text-danger-color",
                placeholderColor: "text-hint-color",
                iconTintColor: "text-hint-color",
                state: {
                  focused: {
                    borderColor: "color-danger-focus",
                    backgroundColor: "background-basic-color-1",
                  },
                  hover: {
                    borderColor: "color-danger-hover",
                    backgroundColor: "background-basic-color-3",
                  },
                  active: {
                    borderColor: "color-danger-active",
                    backgroundColor: "background-basic-color-1",
                    iconTintColor: "text-basic-color",
                  },
                  disabled: {
                    borderColor: "border-basic-color-4",
                    backgroundColor: "background-basic-color-2",
                    textColor: "text-disabled-color",
                    labelColor: "text-disabled-color",
                    captionColor: "text-disabled-color",
                    placeholderColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                    captionIconTintColor: "text-disabled-color",
                  },
                },
              },
              control: {
                borderColor: "color-basic-control-transparent-500",
                backgroundColor: "color-basic-control-transparent-300",
                textColor: "text-control-color",
                labelColor: "text-control-color",
                captionColor: "text-control-color",
                placeholderColor: "text-control-color",
                iconTintColor: "text-control-color",
                state: {
                  focused: {
                    borderColor: "color-control-transparent-focus-border",
                    backgroundColor: "color-basic-control-transparent-500",
                  },
                  hover: {
                    borderColor: "color-control-transparent-hover-border",
                    backgroundColor: "color-basic-control-transparent-400",
                  },
                  active: {
                    borderColor: "color-control-transparent-active-border",
                    backgroundColor: "background-basic-color-1",
                    iconTintColor: "text-basic-color",
                  },
                  disabled: {
                    borderColor: "border-basic-color-4",
                    backgroundColor: "background-basic-color-2",
                    textColor: "text-disabled-color",
                    labelColor: "text-disabled-color",
                    captionColor: "text-disabled-color",
                    placeholderColor: "text-disabled-color",
                    iconTintColor: "text-disabled-color",
                    captionIconTintColor: "text-disabled-color",
                  },
                },
              },
            },
            size: {
              small: {
                borderRadius: "border-radius",
                borderWidth: "border-width",
                minHeight: "size-small",
                paddingVertical: 3,
                textFontSize: "text-subtitle-2-font-size",
                textFontWeight: "text-subtitle-2-font-weight",
                placeholderFontSize: "text-paragraph-1-font-size",
                placeholderFontWeight: "text-paragraph-1-font-weight",
              },
              medium: {
                borderRadius: "border-radius",
                borderWidth: "border-width",
                minHeight: "size-medium",
                paddingVertical: 7,
                textFontSize: "text-subtitle-1-font-size",
                textFontWeight: "text-subtitle-1-font-weight",
                placeholderFontSize: "text-paragraph-1-font-size",
                placeholderFontWeight: "text-paragraph-1-font-weight",
              },
              large: {
                borderRadius: "border-radius",
                borderWidth: "border-width",
                minHeight: "size-large",
                paddingVertical: 11,
                textFontSize: "text-subtitle-1-font-size",
                textFontWeight: "text-subtitle-1-font-weight",
                placeholderFontSize: "text-paragraph-1-font-size",
                placeholderFontWeight: "text-paragraph-1-font-weight",
              },
            },
          },
        },
      },
    },
    SelectOption: {
      meta: {
        scope: "all",
        parameters: {
          paddingHorizontal: {
            type: "number",
          },
          paddingVertical: {
            type: "number",
          },
          paddingLeft: {
            type: "number",
          },
          backgroundColor: {
            type: "string",
          },
          iconWidth: {
            type: "number",
          },
          iconHeight: {
            type: "number",
          },
          iconMarginHorizontal: {
            type: "number",
          },
          iconTintColor: {
            type: "string",
          },
          textMarginHorizontal: {
            type: "number",
          },
          textFontFamily: {
            type: "string",
          },
          textFontSize: {
            type: "number",
          },
          textFontWeight: {
            type: "string",
          },
          textColor: {
            type: "string",
          },
        },
        appearances: {
          default: {
            default: true,
          },
          grouped: {
            default: false,
          },
        },
        variantGroups: {},
        states: {
          hover: {
            default: false,
            priority: 0,
            scope: "all",
          },
          disabled: {
            default: false,
            priority: 1,
            scope: "all",
          },
          selected: {
            default: false,
            priority: 2,
            scope: "all",
          },
          active: {
            default: false,
            priority: 3,
            scope: "all",
          },
          focused: {
            default: false,
            priority: 4,
            scope: "all",
          },
        },
      },
      appearances: {
        default: {
          mapping: {
            paddingHorizontal: 8,
            paddingVertical: 12,
            backgroundColor: "background-basic-color-1",
            textMarginHorizontal: 8,
            textFontSize: "text-subtitle-1-font-size",
            textFontWeight: "text-subtitle-1-font-weight",
            textFontFamily: "text-subtitle-1-font-family",
            textColor: "text-basic-color",
            iconWidth: 20,
            iconHeight: 20,
            iconMarginHorizontal: 8,
            iconTintColor: "text-hint-color",
            state: {
              hover: {
                iconTintColor: "text-primary-hover-color",
                backgroundColor: "color-basic-transparent-hover",
              },
              active: {
                backgroundColor: "color-basic-transparent-active",
              },
              selected: {
                backgroundColor: "color-primary-transparent-default",
                textColor: "text-basic-color",
                iconTintColor: "text-primary-color",
              },
              "selected.hover": {
                "background-color": "color-primary-transparent-100",
                textColor: "text-basic-color",
              },
              disabled: {
                backgroundColor: "background-basic-color-1",
                textColor: "text-disabled-color",
                iconTintColor: "text-disabled-color",
              },
            },
          },
        },
        grouped: {
          mapping: {
            paddingLeft: 16,
          },
        },
      },
    },
    Radio: {
      meta: {
        scope: "all",
        parameters: {
          width: {
            type: "number",
          },
          height: {
            type: "number",
          },
          borderRadius: {
            type: "number",
          },
          borderWidth: {
            type: "number",
          },
          borderColor: {
            type: "string",
          },
          backgroundColor: {
            type: "string",
          },
          textColor: {
            type: "string",
          },
          textFontFamily: {
            type: "string",
          },
          textMarginHorizontal: {
            type: "number",
          },
          textFontSize: {
            type: "number",
          },
          textFontWeight: {
            type: "string",
          },
          iconWidth: {
            type: "number",
          },
          iconHeight: {
            type: "number",
          },
          iconBorderRadius: {
            type: "number",
          },
          iconTintColor: {
            type: "string",
          },
          outlineWidth: {
            type: "number",
          },
          outlineHeight: {
            type: "number",
          },
          outlineBorderRadius: {
            type: "number",
          },
          outlineBackgroundColor: {
            type: "string",
          },
        },
        appearances: {
          default: {
            default: true,
          },
        },
        variantGroups: {
          status: {
            basic: {
              default: true,
            },
            primary: {
              default: false,
            },
            success: {
              default: false,
            },
            info: {
              default: false,
            },
            warning: {
              default: false,
            },
            danger: {
              default: false,
            },
            control: {
              default: false,
            },
          },
        },
        states: {
          checked: {
            default: false,
            priority: 0,
            scope: "all",
          },
          hover: {
            default: false,
            priority: 1,
            scope: "all",
          },
          disabled: {
            default: false,
            priority: 2,
            scope: "all",
          },
          active: {
            default: false,
            priority: 3,
            scope: "all",
          },
          focused: {
            default: false,
            priority: 4,
            scope: "all",
          },
        },
      },
      appearances: {
        default: {
          mapping: {
            width: 20,
            height: 20,
            borderRadius: 10,
            borderWidth: "border-width",
            iconWidth: 12,
            iconHeight: 12,
            iconBorderRadius: 6,
            iconTintColor: "transparent",
            outlineWidth: 32,
            outlineHeight: 32,
            outlineBorderRadius: 16,
            outlineBackgroundColor: "transparent",
            textMarginHorizontal: 12,
            textFontSize: "text-subtitle-2-font-size",
            textFontWeight: "text-subtitle-2-font-weight",
            textFontFamily: "text-subtitle-2-font-family",
          },
          variantGroups: {
            status: {
              basic: {
                borderColor: "color-basic-transparent-default-border",
                backgroundColor: "color-basic-transparent-default",
                textColor: "text-basic-color",
                state: {
                  checked: {
                    borderColor: "color-primary-default-border",
                    backgroundColor: "transparent",
                    iconTintColor: "color-primary-default",
                  },
                  focused: {
                    borderColor: "color-primary-transparent-focus-border",
                    backgroundColor: "color-primary-transparent-focus",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.focused": {
                    borderColor: "color-primary-focus-border",
                    backgroundColor: "transparent",
                    iconTintColor: "color-primary-focus",
                  },
                  hover: {
                    borderColor: "color-primary-transparent-hover-border",
                    backgroundColor: "color-primary-transparent-hover",
                  },
                  "checked.hover": {
                    borderColor: "color-primary-hover-border",
                    backgroundColor: "transparent",
                    iconTintColor: "color-primary-hover",
                  },
                  active: {
                    borderColor: "color-primary-transparent-active-border",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.active": {
                    borderColor: "color-primary-active-border",
                    backgroundColor: "transparent",
                    iconTintColor: "color-primary-active",
                  },
                  disabled: {
                    borderColor: "color-basic-transparent-disabled-border",
                    backgroundColor: "color-basic-transparent-disabled",
                    textColor: "text-disabled-color",
                  },
                  "checked.disabled": {
                    borderColor: "color-basic-transparent-600",
                    backgroundColor: "transparent",
                    iconTintColor: "color-basic-transparent-600",
                  },
                },
              },
              primary: {
                borderColor: "color-primary-transparent-default-border",
                backgroundColor: "color-primary-transparent-default",
                textColor: "text-basic-color",
                state: {
                  checked: {
                    borderColor: "color-primary-default-border",
                    backgroundColor: "transparent",
                    iconTintColor: "color-primary-default",
                  },
                  focused: {
                    borderColor: "color-primary-transparent-focus-border",
                    backgroundColor: "color-primary-transparent-focus",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.focused": {
                    borderColor: "color-primary-focus-border",
                    backgroundColor: "transparent",
                    iconTintColor: "color-primary-focus",
                  },
                  hover: {
                    borderColor: "color-primary-transparent-hover-border",
                    backgroundColor: "color-primary-transparent-hover",
                  },
                  "checked.hover": {
                    borderColor: "color-primary-hover-border",
                    backgroundColor: "transparent",
                    iconTintColor: "color-primary-hover",
                  },
                  active: {
                    borderColor: "color-primary-transparent-active-border",
                    backgroundColor: "color-primary-transparent-active",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.active": {
                    borderColor: "color-primary-active-border",
                    backgroundColor: "transparent",
                    iconTintColor: "color-primary-active",
                  },
                  disabled: {
                    borderColor: "color-basic-transparent-disabled-border",
                    backgroundColor: "color-basic-transparent-disabled",
                    textColor: "text-disabled-color",
                  },
                  "checked.disabled": {
                    borderColor: "color-basic-transparent-600",
                    backgroundColor: "transparent",
                    iconTintColor: "color-basic-transparent-600",
                  },
                },
              },
              success: {
                borderColor: "color-success-transparent-default-border",
                backgroundColor: "color-success-transparent-default",
                textColor: "text-basic-color",
                state: {
                  checked: {
                    borderColor: "color-success-default-border",
                    backgroundColor: "transparent",
                    iconTintColor: "color-success-default",
                  },
                  focused: {
                    borderColor: "color-success-transparent-focus-border",
                    backgroundColor: "color-success-transparent-focus",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.focused": {
                    borderColor: "color-success-focus-border",
                    backgroundColor: "transparent",
                    iconTintColor: "color-success-focus",
                  },
                  hover: {
                    borderColor: "color-success-transparent-hover-border",
                    backgroundColor: "color-success-transparent-hover",
                  },
                  "checked.hover": {
                    borderColor: "color-success-default-hover",
                    backgroundColor: "transparent",
                    iconTintColor: "color-success-hover",
                  },
                  active: {
                    borderColor: "color-success-transparent-active-border",
                    backgroundColor: "color-success-transparent-active",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.active": {
                    borderColor: "color-success-active-border",
                    backgroundColor: "transparent",
                    iconTintColor: "color-success-active",
                  },
                  disabled: {
                    borderColor: "color-basic-transparent-disabled-border",
                    backgroundColor: "color-basic-transparent-disabled",
                    textColor: "text-disabled-color",
                  },
                  "checked.disabled": {
                    borderColor: "color-basic-transparent-600",
                    backgroundColor: "transparent",
                    iconTintColor: "color-basic-transparent-600",
                  },
                },
              },
              info: {
                borderColor: "color-info-transparent-default-border",
                backgroundColor: "color-info-transparent-default",
                textColor: "text-basic-color",
                state: {
                  checked: {
                    borderColor: "color-info-default-border",
                    backgroundColor: "transparent",
                    iconTintColor: "color-info-default",
                  },
                  focused: {
                    borderColor: "color-info-transparent-focus-border",
                    backgroundColor: "color-info-transparent-focus",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.focused": {
                    borderColor: "color-info-focus-border",
                    backgroundColor: "transparent",
                    iconTintColor: "color-info-focus",
                  },
                  hover: {
                    borderColor: "color-info-transparent-hover-border",
                    backgroundColor: "color-info-transparent-hover",
                  },
                  "checked.hover": {
                    borderColor: "color-info-default-hover",
                    backgroundColor: "transparent",
                    iconTintColor: "color-info-hover",
                  },
                  active: {
                    borderColor: "color-info-transparent-active-border",
                    backgroundColor: "color-info-transparent-active",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.active": {
                    borderColor: "color-info-active-border",
                    backgroundColor: "transparent",
                    iconTintColor: "color-info-active",
                  },
                  disabled: {
                    borderColor: "color-basic-transparent-disabled-border",
                    backgroundColor: "color-basic-transparent-disabled",
                    textColor: "text-disabled-color",
                  },
                  "checked.disabled": {
                    borderColor: "color-basic-transparent-600",
                    backgroundColor: "transparent",
                    iconTintColor: "color-basic-transparent-600",
                  },
                },
              },
              warning: {
                borderColor: "color-warning-transparent-default-border",
                backgroundColor: "color-warning-transparent-default",
                textColor: "text-basic-color",
                state: {
                  checked: {
                    borderColor: "color-warning-default-border",
                    backgroundColor: "transparent",
                    iconTintColor: "color-warning-default",
                  },
                  focused: {
                    borderColor: "color-warning-transparent-focus-border",
                    backgroundColor: "color-warning-transparent-focus",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.focused": {
                    borderColor: "color-warning-focus-border",
                    backgroundColor: "transparent",
                    iconTintColor: "color-warning-focus",
                  },
                  hover: {
                    borderColor: "color-warning-transparent-hover-border",
                    backgroundColor: "color-warning-transparent-hover",
                  },
                  "checked.hover": {
                    borderColor: "color-warning-default-hover",
                    backgroundColor: "transparent",
                    iconTintColor: "color-warning-hover",
                  },
                  active: {
                    borderColor: "color-warning-transparent-active-border",
                    backgroundColor: "color-warning-transparent-active",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.active": {
                    borderColor: "color-warning-active-border",
                    backgroundColor: "transparent",
                    iconTintColor: "color-warning-active",
                  },
                  disabled: {
                    borderColor: "color-basic-transparent-disabled-border",
                    backgroundColor: "color-basic-transparent-disabled",
                    textColor: "text-disabled-color",
                  },
                  "checked.disabled": {
                    borderColor: "color-basic-transparent-600",
                    backgroundColor: "transparent",
                    iconTintColor: "color-basic-transparent-600",
                  },
                },
              },
              danger: {
                borderColor: "color-danger-transparent-default-border",
                backgroundColor: "color-danger-transparent-default",
                textColor: "text-basic-color",
                state: {
                  checked: {
                    borderColor: "color-danger-default-border",
                    backgroundColor: "transparent",
                    iconTintColor: "color-danger-default",
                  },
                  focused: {
                    borderColor: "color-danger-transparent-focus-border",
                    backgroundColor: "color-danger-transparent-focus",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.focused": {
                    borderColor: "color-danger-focus-border",
                    backgroundColor: "transparent",
                    iconTintColor: "color-danger-focus",
                  },
                  hover: {
                    borderColor: "color-danger-transparent-hover-border",
                    backgroundColor: "color-danger-transparent-hover",
                  },
                  "checked.hover": {
                    borderColor: "color-danger-default-hover",
                    backgroundColor: "transparent",
                    iconTintColor: "color-danger-hover",
                  },
                  active: {
                    borderColor: "color-danger-transparent-active-border",
                    backgroundColor: "color-danger-transparent-active",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.active": {
                    borderColor: "color-danger-active-border",
                    backgroundColor: "transparent",
                    iconTintColor: "color-danger-active",
                  },
                  disabled: {
                    borderColor: "color-basic-transparent-disabled-border",
                    backgroundColor: "color-basic-transparent-disabled",
                    textColor: "text-disabled-color",
                  },
                  "checked.disabled": {
                    borderColor: "color-basic-transparent-600",
                    backgroundColor: "transparent",
                    iconTintColor: "color-basic-transparent-600",
                  },
                },
              },
              control: {
                borderColor: "color-control-transparent-default-border",
                backgroundColor: "color-control-transparent-default",
                textColor: "text-control-color",
                state: {
                  checked: {
                    borderColor: "color-control-default-border",
                    backgroundColor: "transparent",
                    iconTintColor: "color-control-default",
                  },
                  focused: {
                    borderColor: "color-control-transparent-focus-border",
                    backgroundColor: "color-control-transparent-focus",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.focused": {
                    borderColor: "color-control-focus-border",
                    backgroundColor: "transparent",
                    iconTintColor: "color-control-focus",
                  },
                  hover: {
                    borderColor: "color-control-transparent-hover-border",
                    backgroundColor: "color-control-transparent-hover",
                  },
                  "checked.hover": {
                    borderColor: "color-control-hover-border",
                    backgroundColor: "transparent",
                    iconTintColor: "color-control-hover",
                  },
                  active: {
                    borderColor: "color-control-transparent-active-border",
                    backgroundColor: "color-control-transparent-active",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.active": {
                    borderColor: "color-control-active-border",
                    backgroundColor: "transparent",
                    iconTintColor: "color-control-active",
                  },
                  disabled: {
                    borderColor: "color-control-transparent-disabled-border",
                    backgroundColor: "color-control-transparent-disabled",
                    textColor: "text-control-color",
                  },
                  "checked.disabled": {
                    borderColor: "color-basic-transparent-600",
                    backgroundColor: "transparent",
                    iconTintColor: "color-basic-transparent-600",
                  },
                },
              },
            },
          },
        },
      },
    },
    RadioGroup: {
      meta: {
        scope: "all",
        parameters: {
          itemMarginVertical: {
            type: "number",
          },
        },
        appearances: {
          default: {
            default: true,
          },
        },
        variantGroups: {},
        states: {},
      },
      appearances: {
        default: {
          mapping: {
            itemMarginVertical: 8,
          },
        },
      },
    },
    Spinner: {
      meta: {
        scope: "all",
        parameters: {
          width: {
            type: "number",
          },
          height: {
            type: "number",
          },
          borderWidth: {
            type: "number",
          },
          borderRadius: {
            type: "number",
          },
          borderColor: {
            type: "string",
          },
        },
        appearances: {
          default: {
            default: true,
          },
        },
        variantGroups: {
          status: {
            basic: {
              default: false,
            },
            primary: {
              default: true,
            },
            success: {
              default: false,
            },
            info: {
              default: false,
            },
            warning: {
              default: false,
            },
            danger: {
              default: false,
            },
            control: {
              default: false,
            },
          },
          size: {
            tiny: {
              default: false,
            },
            small: {
              default: false,
            },
            medium: {
              default: false,
            },
            large: {
              default: true,
            },
            giant: {
              default: false,
            },
          },
        },
        states: {},
      },
      appearances: {
        default: {
          mapping: {},
          variantGroups: {
            status: {
              basic: {
                borderColor: "color-basic-default",
              },
              primary: {
                borderColor: "color-primary-default",
              },
              success: {
                borderColor: "color-success-default",
              },
              info: {
                borderColor: "color-info-default",
              },
              warning: {
                borderColor: "color-warning-default",
              },
              danger: {
                borderColor: "color-danger-default",
              },
              control: {
                borderColor: "color-control-default",
              },
            },
            size: {
              tiny: {
                width: 16,
                height: 16,
                borderRadius: 8,
                borderWidth: 2.3,
              },
              small: {
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2.8,
              },
              medium: {
                width: 24,
                height: 24,
                borderRadius: 12,
                borderWidth: 3.4,
              },
              large: {
                width: 28,
                height: 28,
                borderRadius: 14,
                borderWidth: 3.9,
              },
              giant: {
                width: 32,
                height: 32,
                borderRadius: 16,
                borderWidth: 4.5,
              },
            },
          },
        },
      },
    },
    Tab: {
      meta: {
        scope: "all",
        parameters: {
          textFontFamily: {
            type: "string",
          },
          textFontSize: {
            type: "number",
          },
          textFontWeight: {
            type: "number",
          },
          textMarginVertical: {
            type: "number",
          },
          textColor: {
            type: "string",
          },
          iconWidth: {
            type: "number",
          },
          iconHeight: {
            type: "number",
          },
          iconMarginVertical: {
            type: "number",
          },
          iconTintColor: {
            type: "string",
          },
        },
        appearances: {
          default: {
            default: true,
          },
        },
        variantGroups: {},
        states: {
          selected: {
            default: false,
            priority: 0,
            scope: "all",
          },
          hover: {
            default: false,
            priority: 1,
            scope: "all",
          },
          focused: {
            default: false,
            priority: 2,
            scope: "all",
          },
        },
      },
      appearances: {
        default: {
          mapping: {
            textMarginVertical: 2,
            textFontSize: 14,
            textFontWeight: "bold",
            textFontFamily: "text-font-family",
            textColor: "text-hint-color",
            iconWidth: 24,
            iconHeight: 24,
            iconMarginVertical: 2,
            iconTintColor: "text-hint-color",
            state: {
              hover: {
                textColor: "text-primary-hover-color",
                iconTintColor: "text-primary-hover-color",
              },
              selected: {
                textColor: "text-primary-color",
                iconTintColor: "text-primary-color",
              },
            },
          },
        },
      },
    },
    TabBar: {
      meta: {
        scope: "all",
        parameters: {
          paddingVertical: {
            type: "number",
          },
          backgroundColor: {
            type: "string",
          },
          indicatorHeight: {
            type: "number",
          },
          indicatorBorderRadius: {
            type: "number",
          },
          indicatorBackgroundColor: {
            type: "string",
          },
        },
        appearances: {
          default: {
            default: true,
          },
        },
        variantGroups: {},
        states: {},
      },
      appearances: {
        default: {
          mapping: {
            paddingVertical: 4,
            backgroundColor: "background-basic-color-1",
            indicatorHeight: 4,
            indicatorBorderRadius: 2,
            indicatorBackgroundColor: "color-primary-default",
          },
        },
      },
    },
    Text: {
      meta: {
        scope: "all",
        parameters: {
          fontFamily: {
            type: "string",
          },
          fontSize: {
            type: "number",
          },
          fontWeight: {
            type: "string",
          },
          color: {
            type: "string",
          },
        },
        appearances: {
          default: {
            default: true,
          },
          alternative: {
            default: false,
          },
          hint: {
            default: false,
          },
        },
        variantGroups: {
          category: {
            h1: {
              default: false,
            },
            h2: {
              default: false,
            },
            h3: {
              default: false,
            },
            h4: {
              default: false,
            },
            h5: {
              default: false,
            },
            h6: {
              default: false,
            },
            s1: {
              default: false,
            },
            s2: {
              default: false,
            },
            p1: {
              default: true,
            },
            p2: {
              default: false,
            },
            c1: {
              default: false,
            },
            c2: {
              default: false,
            },
            label: {
              default: false,
            },
          },
          status: {
            basic: {
              default: false,
            },
            primary: {
              default: false,
            },
            success: {
              default: false,
            },
            info: {
              default: false,
            },
            warning: {
              default: false,
            },
            danger: {
              default: false,
            },
            control: {
              default: false,
            },
          },
        },
        states: {},
      },
      appearances: {
        default: {
          mapping: {
            color: "text-basic-color",
          },
          variantGroups: {
            category: {
              h1: {
                fontSize: "text-heading-1-font-size",
                fontWeight: "text-heading-1-font-weight",
                fontFamily: "text-heading-1-font-family",
              },
              h2: {
                fontSize: "text-heading-2-font-size",
                fontWeight: "text-heading-2-font-weight",
                fontFamily: "text-heading-2-font-family",
              },
              h3: {
                fontSize: "text-heading-3-font-size",
                fontWeight: "text-heading-3-font-weight",
                fontFamily: "text-heading-3-font-family",
              },
              h4: {
                fontSize: "text-heading-4-font-size",
                fontWeight: "text-heading-4-font-weight",
                fontFamily: "text-heading-4-font-family",
              },
              h5: {
                fontSize: "text-heading-5-font-size",
                fontWeight: "text-heading-5-font-weight",
                fontFamily: "text-heading-5-font-family",
              },
              h6: {
                fontSize: "text-heading-6-font-size",
                fontWeight: "text-heading-6-font-weight",
                fontFamily: "text-heading-6-font-family",
              },
              s1: {
                fontSize: "text-subtitle-1-font-size",
                fontWeight: "text-subtitle-1-font-weight",
                fontFamily: "text-subtitle-1-font-family",
              },
              s2: {
                fontSize: "text-subtitle-2-font-size",
                fontWeight: "text-subtitle-2-font-weight",
                fontFamily: "text-subtitle-2-font-family",
              },
              p1: {
                fontSize: "text-paragraph-1-font-size",
                fontWeight: "text-paragraph-1-font-weight",
                fontFamily: "text-paragraph-1-font-family",
              },
              p2: {
                fontSize: "text-paragraph-2-font-size",
                fontWeight: "text-paragraph-2-font-weight",
                fontFamily: "text-paragraph-2-font-family",
              },
              c1: {
                fontSize: "text-caption-1-font-size",
                fontWeight: "text-caption-1-font-weight",
                fontFamily: "text-caption-1-font-family",
              },
              c2: {
                fontSize: "text-caption-2-font-size",
                fontWeight: "text-caption-2-font-weight",
                fontFamily: "text-caption-2-font-family",
              },
              label: {
                fontSize: "text-label-font-size",
                fontWeight: "text-label-font-weight",
                fontFamily: "text-label-font-family",
              },
            },
            status: {
              basic: {
                color: "text-basic-color",
              },
              primary: {
                color: "text-primary-color",
              },
              success: {
                color: "text-success-color",
              },
              info: {
                color: "text-info-color",
              },
              warning: {
                color: "text-warning-color",
              },
              danger: {
                color: "text-danger-color",
              },
              control: {
                color: "text-control-color",
              },
            },
          },
        },
        alternative: {
          mapping: {
            color: "text-alternate-color",
          },
        },
        hint: {
          mapping: {
            color: "text-hint-color",
          },
        },
      },
    },
    Toggle: {
      meta: {
        scope: "all",
        parameters: {
          width: {
            type: "number",
          },
          height: {
            type: "number",
          },
          borderRadius: {
            type: "number",
          },
          borderWidth: {
            type: "number",
          },
          borderColor: {
            type: "string",
          },
          backgroundColor: {
            type: "string",
          },
          thumbWidth: {
            type: "number",
          },
          thumbHeight: {
            type: "number",
          },
          thumbBorderRadius: {
            type: "number",
          },
          thumbBackgroundColor: {
            type: "string",
          },
          textMarginHorizontal: {
            type: "number",
          },
          textFontFamily: {
            type: "string",
          },
          textFontSize: {
            type: "number",
          },
          textFontWeight: {
            type: "string",
          },
          textColor: {
            type: "string",
          },
          iconWidth: {
            type: "number",
          },
          iconHeight: {
            type: "number",
          },
          iconTintColor: {
            type: "string",
          },
          outlineWidth: {
            type: "number",
          },
          outlineHeight: {
            type: "number",
          },
          outlineBorderRadius: {
            type: "number",
          },
          outlineBackgroundColor: {
            type: "string",
          },
        },
        appearances: {
          default: {
            default: true,
          },
        },
        variantGroups: {
          status: {
            basic: {
              default: true,
            },
            primary: {
              default: false,
            },
            success: {
              default: false,
            },
            info: {
              default: false,
            },
            warning: {
              default: false,
            },
            danger: {
              default: false,
            },
            control: {
              default: false,
            },
          },
        },
        states: {
          checked: {
            default: false,
            priority: 0,
            scope: "all",
          },
          hover: {
            default: false,
            priority: 1,
            scope: "all",
          },
          disabled: {
            default: false,
            priority: 2,
            scope: "all",
          },
          active: {
            default: false,
            priority: 3,
            scope: "all",
          },
          focused: {
            default: false,
            priority: 4,
            scope: "all",
          },
        },
      },
      appearances: {
        default: {
          mapping: {
            width: 52,
            height: 32,
            borderRadius: 16,
            borderWidth: "border-width",
            thumbWidth: 28,
            thumbHeight: 28,
            thumbBorderRadius: 14,
            outlineWidth: 64,
            outlineHeight: 42,
            outlineBorderRadius: 21,
            textMarginHorizontal: 12,
            textFontSize: "text-subtitle-2-font-size",
            textFontWeight: "text-subtitle-2-font-weight",
            textFontFamily: "text-subtitle-2-font-family",
            iconWidth: 12,
            iconHeight: 12,
          },
          variantGroups: {
            status: {
              basic: {
                borderColor: "color-basic-transparent-default-border",
                backgroundColor: "color-basic-transparent-default",
                thumbBackgroundColor: "background-basic-color-1",
                outlineBackgroundColor: "transparent",
                textColor: "text-basic-color",
                iconTintColor: "transparent",
                state: {
                  checked: {
                    borderColor: "color-primary-default-border",
                    backgroundColor: "color-primary-default",
                    iconTintColor: "text-primary-color",
                  },
                  focused: {
                    borderColor: "color-primary-transparent-focus-border",
                    backgroundColor: "color-primary-transparent-focus",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.focused": {
                    borderColor: "color-primary-focus-border",
                    backgroundColor: "color-primary-focus",
                  },
                  hover: {
                    borderColor: "color-primary-transparent-hover-border",
                    backgroundColor: "color-primary-transparent-hover",
                  },
                  "checked.hover": {
                    borderColor: "color-primary-hover-border",
                    backgroundColor: "color-primary-hover",
                  },
                  active: {
                    borderColor: "color-primary-transparent-active-border",
                    backgroundColor: "color-primary-transparent-active",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.active": {
                    borderColor: "color-primary-active-border",
                    backgroundColor: "color-primary-active",
                  },
                  disabled: {
                    borderColor: "color-basic-transparent-disabled-border",
                    backgroundColor: "color-basic-transparent-disabled",
                    thumbBackgroundColor: "color-basic-disabled",
                    textColor: "text-disabled-color",
                  },
                  "checked.disabled": {
                    iconTintColor: "text-control-color",
                  },
                },
              },
              primary: {
                borderColor: "color-primary-transparent-default-border",
                backgroundColor: "color-primary-transparent-default",
                thumbBackgroundColor: "background-basic-color-1",
                outlineBackgroundColor: "transparent",
                textColor: "text-basic-color",
                iconTintColor: "transparent",
                state: {
                  checked: {
                    borderColor: "color-primary-default-border",
                    backgroundColor: "color-primary-default",
                    iconTintColor: "text-primary-color",
                  },
                  focused: {
                    borderColor: "color-primary-transparent-focus-border",
                    backgroundColor: "color-primary-transparent-focus",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.focused": {
                    borderColor: "color-primary-focus-border",
                    backgroundColor: "color-primary-focus",
                  },
                  hover: {
                    borderColor: "color-primary-transparent-hover-border",
                    backgroundColor: "color-primary-transparent-hover",
                  },
                  "checked.hover": {
                    borderColor: "color-primary-hover-border",
                    backgroundColor: "color-primary-hover",
                  },
                  active: {
                    borderColor: "color-primary-transparent-active-border",
                    backgroundColor: "color-primary-transparent-active",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.active": {
                    borderColor: "color-primary-active-border",
                    backgroundColor: "color-primary-active",
                  },
                  disabled: {
                    borderColor: "color-basic-transparent-disabled-border",
                    backgroundColor: "color-basic-transparent-disabled",
                    thumbBackgroundColor: "color-basic-disabled",
                    textColor: "text-disabled-color",
                  },
                  "checked.disabled": {
                    iconTintColor: "text-control-color",
                  },
                },
              },
              success: {
                borderColor: "color-success-transparent-default-border",
                backgroundColor: "color-success-transparent-default",
                thumbBackgroundColor: "background-basic-color-1",
                outlineBackgroundColor: "transparent",
                textColor: "text-basic-color",
                iconTintColor: "transparent",
                state: {
                  checked: {
                    borderColor: "color-success-default-border",
                    backgroundColor: "color-success-default",
                    iconTintColor: "text-success-color",
                  },
                  focused: {
                    borderColor: "color-success-transparent-focus-border",
                    backgroundColor: "color-success-transparent-focus",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.focused": {
                    borderColor: "color-success-focus-border",
                    backgroundColor: "color-success-focus",
                  },
                  hover: {
                    borderColor: "color-success-transparent-hover-border",
                    backgroundColor: "color-success-transparent-hover",
                  },
                  "checked.hover": {
                    borderColor: "color-success-hover-border",
                    backgroundColor: "color-success-hover",
                  },
                  active: {
                    borderColor: "color-success-transparent-active-border",
                    backgroundColor: "color-success-transparent-active",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.active": {
                    borderColor: "color-success-active-border",
                    backgroundColor: "color-success-active",
                  },
                  disabled: {
                    borderColor: "color-basic-transparent-disabled-border",
                    backgroundColor: "color-basic-transparent-disabled",
                    thumbBackgroundColor: "color-basic-disabled",
                    textColor: "text-disabled-color",
                  },
                  "checked.disabled": {
                    iconTintColor: "text-control-color",
                  },
                },
              },
              info: {
                borderColor: "color-info-transparent-default-border",
                backgroundColor: "color-info-transparent-default",
                thumbBackgroundColor: "background-basic-color-1",
                outlineBackgroundColor: "transparent",
                textColor: "text-basic-color",
                iconTintColor: "transparent",
                state: {
                  checked: {
                    borderColor: "color-info-default-border",
                    backgroundColor: "color-info-default",
                    iconTintColor: "text-info-color",
                  },
                  focused: {
                    borderColor: "color-info-transparent-focus-border",
                    backgroundColor: "color-info-transparent-focus",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.focused": {
                    borderColor: "color-info-focus-border",
                    backgroundColor: "color-info-focus",
                  },
                  hover: {
                    borderColor: "color-info-transparent-hover-border",
                    backgroundColor: "color-info-transparent-hover",
                  },
                  "checked.hover": {
                    borderColor: "color-info-hover-border",
                    backgroundColor: "color-info-hover",
                  },
                  active: {
                    borderColor: "color-info-transparent-active-border",
                    backgroundColor: "color-info-transparent-active",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.active": {
                    borderColor: "color-info-active-border",
                    backgroundColor: "color-info-active",
                  },
                  disabled: {
                    borderColor: "color-basic-transparent-disabled-border",
                    backgroundColor: "color-basic-transparent-disabled",
                    thumbBackgroundColor: "color-basic-disabled",
                    textColor: "text-disabled-color",
                  },
                  "checked.disabled": {
                    iconTintColor: "text-control-color",
                  },
                },
              },
              warning: {
                borderColor: "color-warning-transparent-default-border",
                backgroundColor: "color-warning-transparent-default",
                thumbBackgroundColor: "background-basic-color-1",
                outlineBackgroundColor: "transparent",
                textColor: "text-basic-color",
                iconTintColor: "transparent",
                state: {
                  checked: {
                    borderColor: "color-warning-default-border",
                    backgroundColor: "color-warning-default",
                    iconTintColor: "text-warning-color",
                  },
                  focused: {
                    borderColor: "color-warning-transparent-focus-border",
                    backgroundColor: "color-warning-transparent-focus",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.focused": {
                    borderColor: "color-warning-focus-border",
                    backgroundColor: "color-warning-focus",
                  },
                  hover: {
                    borderColor: "color-warning-transparent-hover-border",
                    backgroundColor: "color-warning-transparent-hover",
                  },
                  "checked.hover": {
                    borderColor: "color-warning-hover-border",
                    backgroundColor: "color-warning-hover",
                  },
                  active: {
                    borderColor: "color-warning-transparent-active-border",
                    backgroundColor: "color-warning-transparent-active",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.active": {
                    borderColor: "color-warning-active-border",
                    backgroundColor: "color-warning-active",
                  },
                  disabled: {
                    borderColor: "color-basic-transparent-disabled-border",
                    backgroundColor: "color-basic-transparent-disabled",
                    thumbBackgroundColor: "color-basic-disabled",
                    textColor: "text-disabled-color",
                  },
                  "checked.disabled": {
                    iconTintColor: "text-control-color",
                  },
                },
              },
              danger: {
                borderColor: "color-danger-transparent-default-border",
                backgroundColor: "color-danger-transparent-default",
                thumbBackgroundColor: "background-basic-color-1",
                outlineBackgroundColor: "transparent",
                textColor: "text-basic-color",
                iconTintColor: "transparent",
                state: {
                  checked: {
                    borderColor: "color-danger-default-border",
                    backgroundColor: "color-danger-default",
                    iconTintColor: "text-danger-color",
                  },
                  focused: {
                    borderColor: "color-danger-transparent-focus-border",
                    backgroundColor: "color-danger-transparent-focus",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.focused": {
                    borderColor: "color-danger-focus-border",
                    backgroundColor: "color-danger-focus",
                  },
                  hover: {
                    borderColor: "color-danger-transparent-hover-border",
                    backgroundColor: "color-danger-transparent-hover",
                  },
                  "checked.hover": {
                    borderColor: "color-danger-hover-border",
                    backgroundColor: "color-danger-hover",
                  },
                  active: {
                    borderColor: "color-danger-transparent-active-border",
                    backgroundColor: "color-danger-transparent-active",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.active": {
                    borderColor: "color-danger-active-border",
                    backgroundColor: "color-danger-active",
                  },
                  disabled: {
                    borderColor: "color-basic-transparent-disabled-border",
                    backgroundColor: "color-basic-transparent-disabled",
                    thumbBackgroundColor: "color-basic-disabled",
                    textColor: "text-disabled-color",
                  },
                  "checked.disabled": {
                    iconTintColor: "text-control-color",
                  },
                },
              },
              control: {
                borderColor: "color-control-transparent-default-border",
                backgroundColor: "color-control-transparent-default",
                thumbBackgroundColor: "color-control-default",
                outlineBackgroundColor: "transparent",
                textColor: "text-control-color",
                iconTintColor: "transparent",
                state: {
                  checked: {
                    borderColor: "color-control-transparent-default-border",
                    backgroundColor: "color-control-transparent-default",
                    iconTintColor: "color-basic-800",
                  },
                  focused: {
                    borderColor: "color-control-transparent-focus-border",
                    backgroundColor: "color-control-transparent-focus",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.focused": {
                    borderColor: "color-control-transparent-focus-border",
                    backgroundColor: "color-control-transparent-focus",
                  },
                  hover: {
                    borderColor: "color-control-transparent-hover-border",
                    backgroundColor: "color-control-transparent-hover",
                  },
                  "checked.hover": {
                    borderColor: "color-control-transparent-hover-border",
                    backgroundColor: "color-control-transparent-hover",
                  },
                  active: {
                    borderColor: "color-control-transparent-active-border",
                    backgroundColor: "color-control-transparent-active",
                    outlineBackgroundColor: "outline-color",
                  },
                  "checked.active": {
                    borderColor: "color-control-transparent-active-border",
                    backgroundColor: "color-control-transparent-active",
                  },
                  disabled: {
                    borderColor: "color-control-transparent-disabled-border",
                    backgroundColor: "color-control-transparent-disabled",
                    thumbBackgroundColor: "color-basic-transparent-600",
                    textColor: "text-control-color",
                  },
                  "checked.disabled": {
                    iconTintColor: "text-control-color",
                  },
                },
              },
            },
          },
        },
      },
    },
    Tooltip: {
      meta: {
        scope: "all",
        parameters: {
          paddingHorizontal: {
            type: "number",
          },
          paddingVertical: {
            type: "number",
          },
          borderWidth: {
            type: "number",
          },
          borderRadius: {
            type: "number",
          },
          borderColor: {
            type: "string",
          },
          backgroundColor: {
            type: "string",
          },
          indicatorBackgroundColor: {
            type: "string",
          },
          iconWidth: {
            type: "number",
          },
          iconHeight: {
            type: "number",
          },
          iconMarginHorizontal: {
            type: "number",
          },
          iconTintColor: {
            type: "string",
          },
          textMarginHorizontal: {
            type: "number",
          },
          textFontFamily: {
            type: "string",
          },
          textFontSize: {
            type: "number",
          },
          textFontWeight: {
            type: "number",
          },
          textColor: {
            type: "string",
          },
        },
        appearances: {
          default: {
            default: true,
          },
        },
        variantGroups: {},
        states: {},
      },
      appearances: {
        default: {
          mapping: {
            borderRadius: "border-radius",
            borderColor: "background-alternative-color-3",
            backgroundColor: "background-alternative-color-3",
            paddingHorizontal: 16,
            paddingVertical: 8,
            indicatorBackgroundColor: "background-alternative-color-3",
            textMarginHorizontal: 4,
            textFontSize: "text-caption-1-font-size",
            textFontWeight: "text-caption-1-font-weight",
            textFontFamily: "text-caption-1-font-family",
            textColor: "text-alternate-color",
            iconWidth: 14,
            iconHeight: 14,
            iconMarginHorizontal: 4,
            iconTintColor: "text-alternate-color",
          },
        },
      },
    },
    TopNavigation: {
      meta: {
        scope: "mobile",
        parameters: {
          minHeight: {
            type: "number",
          },
          paddingVertical: {
            type: "number",
          },
          paddingHorizontal: {
            type: "number",
          },
          backgroundColor: {
            type: "string",
          },
          titleTextAlign: {
            type: "string",
          },
          titleFontFamily: {
            type: "string",
          },
          titleFontSize: {
            type: "number",
          },
          titleFontWeight: {
            type: "string",
          },
          titleColor: {
            type: "string",
          },
          subtitleTextAlign: {
            type: "string",
          },
          subtitleFontFamily: {
            type: "string",
          },
          subtitleFontSize: {
            type: "number",
          },
          subtitleFontWeight: {
            type: "string",
          },
          subtitleColor: {
            type: "string",
          },
        },
        appearances: {
          default: {
            default: true,
          },
          control: {
            default: false,
          },
        },
        variantGroups: {
          alignment: {
            start: {
              default: true,
            },
            center: {
              default: false,
            },
          },
        },
        states: {},
      },
      appearances: {
        default: {
          mapping: {
            minHeight: 56,
            paddingVertical: 8,
            paddingHorizontal: 8,
            backgroundColor: "background-basic-color-1",
            titleFontSize: "text-subtitle-1-font-size",
            titleFontWeight: "text-subtitle-1-font-weight",
            titleFontFamily: "text-subtitle-1-font-family",
            titleColor: "text-basic-color",
            subtitleFontSize: "text-caption-1-font-size",
            subtitleFontWeight: "text-caption-1-font-weight",
            subtitleFontFamily: "text-caption-1-font-family",
            subtitleColor: "text-hint-color",
          },
          variantGroups: {
            alignment: {
              start: {
                titleTextAlign: "left",
                subtitleTextAlign: "left",
              },
              center: {
                titleTextAlign: "center",
                subtitleTextAlign: "center",
              },
            },
          },
        },
        control: {
          mapping: {
            backgroundColor: "transparent",
          },
        },
      },
    },
    TopNavigationAction: {
      meta: {
        scope: "mobile",
        parameters: {
          iconWidth: {
            type: "number",
          },
          iconHeight: {
            type: "number",
          },
          iconTintColor: {
            type: "string",
          },
          iconMarginHorizontal: {
            type: "number",
          },
        },
        appearances: {
          default: {
            default: true,
          },
          control: {
            default: false,
          },
        },
        variantGroups: {},
        states: {
          hover: {
            default: false,
            priority: 0,
            scope: "all",
          },
          active: {
            default: false,
            priority: 1,
            scope: "all",
          },
          focused: {
            default: false,
            priority: 2,
            scope: "all",
          },
        },
      },
      appearances: {
        default: {
          mapping: {
            iconWidth: 24,
            iconHeight: 24,
            iconMarginHorizontal: 8,
            iconTintColor: "text-basic-color",
            state: {
              hover: {
                iconTintColor: "text-hint-color",
              },
              focused: {
                iconTintColor: "text-hint-color",
              },
              active: {
                iconTintColor: "text-hint-color",
              },
            },
          },
        },
        control: {
          mapping: {
            iconTintColor: "color-control-default",
            state: {
              hover: {
                iconTintColor: "color-control-hover",
              },
              focused: {
                iconTintColor: "color-control-focus",
              },
              active: {
                iconTintColor: "color-control-active",
              },
            },
          },
        },
      },
    },
  },
};
