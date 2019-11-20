import * as React from "react";
import {
  Box,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  makeStyles,
  Badge,
  Button
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useMap, useList } from "react-use";
import Radio from "./Radio";
import Checkbox from "./Checkbox";
import { OutlinedInput } from "./Input";
import { useCallback } from "react";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%"
  },
  heading: {
    flexBasis: "45%",
    flexShrink: 0
  },
  secondaryHeading: {
    color: "gray"
  },
  badge: {
    marginRight: "15px",
    width: "70px"
  },
  success_bg: {
    backgroundColor: "#39C16C",
    color: "white"
  },
  circle: {
    borderRadius: "50%"
  }
}));

const SectionTitle = (props: {
  children: React.ReactNode | React.ReactNode[];
  wrapperProps?: any;
}) => {
  const classes = useStyles({});
  return (
    <Typography variant="h6" gutterBottom className={classes.heading}>
      {props.children}
    </Typography>
  );
};

const SectionSubtitle = (props: {
  children: React.ReactNode | React.ReactNode[];
  wrapperProps?: any;
}) => {
  const classes = useStyles({});
  return (
    <Typography
      variant="subtitle1"
      gutterBottom
      className={classes.secondaryHeading}
    >
      {props.children}
    </Typography>
  );
};

const Section = (props: {
  id: string;
  title: React.ReactNode | React.ReactNode[];
  subtitle?: React.ReactNode | React.ReactNode[];
  content: React.ReactNode | React.ReactNode[];
  incompleteCount?: number;
  open?: boolean;
  onExpandChange?: (expandedState: boolean) => void;
}) => {
  const {
    id,
    title,
    subtitle,
    content,
    incompleteCount,
    open,
    onExpandChange
  } = props;
  const classes = useStyles({});
  const toggleExpanded = useCallback(
    () => onExpandChange && onExpandChange(!open),
    [open, onExpandChange]
  );
  return (
    <ExpansionPanel expanded={!!open}>
      <ExpansionPanelSummary
        expandIcon={
          incompleteCount && !open ? (
            <Badge
              className={classes.badge}
              badgeContent={incompleteCount + " Missing"}
              color="secondary"
            >
              {null}
            </Badge>
          ) : open ? (
            <ExpandMoreIcon />
          ) : (
            <CheckIcon className={classes.success_bg + " " + classes.circle} />
          )
        }
        id={id}
        onClick={toggleExpanded}
      >
        <SectionTitle>{title}</SectionTitle>
        <SectionSubtitle>{subtitle}</SectionSubtitle>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>{content}</ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export const PartForm = () => {
  const [form, updateForm] = useMap();
  const [userInfo, updateUserInfo] = useMap();
  const [expandedPanels, updateExpandedPanels] = useList<string>();
  const handleExpandedChange = (id: string, isExpanded: boolean) => {
    let idIndex = expandedPanels.indexOf(id);
    if (idIndex >= 0) {
      // ID IN ARRAY
      if (!isExpanded) {
        //SHOULD BE REMOVED
        updateExpandedPanels.remove(idIndex);
      }
    } else {
      // ID NOT IN ARRAY
      if (isExpanded) {
        // SHOULD BE ADDED
        updateExpandedPanels.push(id);
      }
    }
  };
  const handleDoneClick = (id: string) => {
    handleExpandedChange(id, false);
    setTimeout(() => {
      let sectionIndex = formConfig.findIndex(section => section.id === id);
      handleExpandedChange(formConfig[sectionIndex + 1].id, true);
    }, 500);
  };
  const handleChange = (key: string, value: any) => {
    updateForm.set(key, value);
  };
  const generateSubtitle = (keyPrefix: string) => {
    return Object.keys(form)
      .filter(optionKey => optionKey.startsWith(keyPrefix + "_"))
      .map((matchingKey: string) => form[matchingKey])
      .join(", ");
  };
  const createRadio = (label: string, id: string, options: string[]) => ({
    type: "radio",
    label,
    name: id,
    options
  });
  const createCheckbox = (label: string, id: string) => ({
    type: "checkbox",
    label,
    name: id
  });
  const formConfig: Array<{
    title: string;
    id: string;
    content: any;
  }> = [
    {
      title: "Ham",
      id: "ham",
      content: [
        createRadio(
          "Do you want your ham fresh or cured and smoked?",
          "ham_freshOrCured",
          ["Fresh", "Cured & Smoked"]
        ),
        createRadio("Do you want the ham whole or sliced?", "ham_wholeSliced", [
          "Whole",
          "Sliced"
        ])
      ]
    },
    {
      title: "Shoulder",
      id: "shoulder",
      content: [
        createRadio(
          "Do you want the shoulder fresh or cured or made into sausage?",
          "shoulder_freshOrCured",
          ["Fresh", "Cured", "Sausage"]
        ),
        createRadio(
          "Do you want the shoulder whole or sliced?",
          "shoulder_wholeSliced",
          ["Whole", "Sliced"]
        )
      ]
    },
    {
      title: "Belly",
      id: "belly",
      content: [
        createRadio(
          "Do you want this made into bacon or left as fresh pork belly? ",
          "belly_baconOrFresh",
          ["Bacon", "Fresh"]
        ),
        createRadio(
          "Do you want it left whole or sliced?",
          "belly_wholeSliced",
          ["Whole", "Sliced"]
        ),
        createRadio(
          "Do you want it packed in packages of 1lb or 2lb?",
          "belly_packSize",
          ["1lb", "2lb"]
        )
      ]
    },
    {
      title: "Pork Butt",
      id: "butt",
      content: [
        createRadio(
          "Do you want this cut into country style ribs or made into roasts or should we add it to the sausage?",
          "butt_ribsRoastsSausage",
          ["Ribs", "Roasts", "More Sausage"]
        )
      ]
    },
    {
      title: "Loin",
      id: "loin",
      content: [
        createRadio(
          "Do you want pork chops or boneless loin roast or bone-in loin roast?",
          "loin_chopsRoast",
          ["Chops", "Roasts", "Roasts (bone-in)"]
        )
      ]
    },
    {
      title: "Chops",
      id: "chops",
      content: [
        createRadio(
          'How thick do you want the pork chops? (1" thick is standard)',
          "chops_thickness",
          ['3/4"', '1"', '1 1/2"']
        ),
        createRadio(
          "How many chops would you like in each package?",
          "chops_packageCount",
          ["2", "3", "4"]
        )
      ]
    },
    {
      title: "Roasts",
      id: "roasts",
      content: [
        createRadio(
          "What size would you like the roasts to be?",
          "roasts_size",
          ["3lb", "4lb", "5lb"]
        )
      ]
    },
    {
      title: "Sausage",
      id: "sausage",
      content: [
        createCheckbox("Regular", "sausage_regular"),
        createCheckbox("Hot Italian", "sausage_hotItalian"),
        createCheckbox("Mild Italian", "sausage_mildItalian"),
        createCheckbox("Chorizo", "sausage_chorizo"),
        createCheckbox("Andouille", "sausage_andouille"),
        createRadio(
          "Do you want your sausage loose or linked?",
          "sausage_looseLinked",
          ["Loose", "Linked"]
        ),
        createRadio(
          "Do you want the sausage packaged in 1lb or 2lb packs?",
          "sausage_packageSize",
          ["1lb", "2lb"]
        )
      ]
    }
  ];
  function countCompletedInputs(keyPrefix: string) {
    return Object.keys(form).filter(keyName =>
      keyName.startsWith(keyPrefix + "_")
    ).length;
  }
  const handleInputChange = useCallback(
    (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
      updateUserInfo.set(key, e.target.value);
    },
    [updateUserInfo]
  );
  const isFormComplete = useCallback(() => {
    let fieldsToComplete =
      3 + formConfig.reduce((sum, section) => sum + section.content.length, 0);
    let completedFields = Object.keys(form).length;
    console.log(
      completedFields,
      fieldsToComplete,
      completedFields >= fieldsToComplete
    );
    return completedFields >= fieldsToComplete;
  }, [formConfig, form]);
  return (
    <Box maxWidth={400}>
      <Box textAlign="center">
        <Typography variant="h3">Stohlman Acres</Typography>
        <Typography variant="h5">
          {" "}
          <span role="img" aria-label="knife">
            🔪
          </span>{" "}
          Cut Sheet{" "}
          <span role="img" aria-label="knife">
            🔪
          </span>
        </Typography>
      </Box>
      <Box>
        <OutlinedInput
          id="name"
          inputType="name"
          value={userInfo.name}
          onChange={handleInputChange.bind(null, "name")}
        />
        <OutlinedInput
          id="email"
          inputType="email"
          value={userInfo.email}
          onChange={handleInputChange.bind(null, "email")}
        />
        <OutlinedInput
          id="phone"
          inputType="tel"
          value={userInfo.phone}
          onChange={handleInputChange.bind(null, "phone")}
        />
      </Box>
      {formConfig.map((section: any) => {
        let incompleteCount =
          section.content.length - countCompletedInputs(section.id);
        return (
          <Section
            {...section}
            subtitle={generateSubtitle(section.id)}
            incompleteCount={incompleteCount}
            open={expandedPanels.includes(section.id)}
            onExpandChange={handleExpandedChange.bind(null, section.id)}
            content={
              <Box>
                {section.content.map((input: any) => {
                  switch (input.type) {
                    case "radio":
                      return (
                        <Radio
                          {...input}
                          onChange={handleChange}
                          value={form[input.name]}
                        />
                      );
                    case "checkbox":
                      return (
                        <Checkbox
                          {...input}
                          onChange={handleChange}
                          value={form[input.name]}
                        />
                      );
                    default:
                      return null;
                  }
                })}
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!!incompleteCount}
                  onClick={handleDoneClick.bind(null, section.id)}
                >
                  Next
                </Button>
              </Box>
            }
          />
        );
      })}
      <Box my="20px">
        <Button
          variant="contained"
          color="secondary"
          disabled={!isFormComplete()}
          onClick={() => alert("done")}
          fullWidth
          size="large"
        >
          Submit Order
        </Button>
      </Box>
    </Box>
  );
};

export default PartForm;
