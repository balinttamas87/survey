/* eslint-disable no-console */
import * as React from "react";
import { Container, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "@mui/material/styles";
import { SurveyBlock } from "./components/SurveyBlock";
import { FormCheckbox } from "./components/FormCheckbox";
import { FormTextField } from "./components/FormTextField";

function App() {
  const theme = useTheme();

  const formBuilderObject = {
    pages: [
      {
        name: "page1",
        elements: [
          // {
          //   type: "checkbox",
          //   name: "promoter_features",
          //   visibleIf: "{nps_score} >= 9",
          //   title: "Which of the following features do you value the most?",
          //   description: "Please select no more than three features.",
          //   isRequired: true,
          //   validators: [
          //     {
          //       type: "answercount",
          //       text: "Please select no more than three features.",
          //       maxCount: 3
          //     }
          //   ],
          //   showOtherItem: true,
          //   choices: [
          //     "Performance",
          //     "Stability",
          //     "User interface",
          //     "Complete functionality",
          //     "Learning materials (documentation, demos, code examples)",
          //     "Quality support"
          //   ],
          //   otherText: "Other features:",
          //   colCount: 2
          // },
          {
            type: "checkbox",
            name: "multipleChoice",
            label: "Check check",
            showOtherItem: true,
            choices: [
              "Performance",
              "Stability",
              "User interface",
              "Complete functionality",
              "Learning materials (documentation, demos, code examples)",
              "Quality support"
            ]
          },
          { type: "textField", name: "textField", title: "Text field" }
        ]
      }
    ],
    completedHtml: "<h3>Thank you for your feedback</h3>",
    completedHtmlOnCondition: [
      {
        expression: "{nps_score} >= 9",
        html: "<h3>Thank you for your feedback</h3> <h4>We are glad that you love our product. Your ideas and suggestions will help us make it even better.</h4>"
      },
      {
        expression: "{nps_score} >= 6  and {nps_score} <= 8",
        html: "<h3>Thank you for your feedback</h3> <h4>We are glad that you shared your ideas with us. They will help us make our product better.</h4>"
      }
    ],
    showQuestionNumbers: "off"
  };

  const builtInputSchema = formBuilderObject.pages[0].elements.reduce(
    (acc = {}, current) => {
      if (current.type === "checkbox") {
        return { ...acc, [current.name]: z.boolean() };
      } else if (current.type === "textField") {
        return { ...acc, [current.name]: z.string().min(1).max(10) };
      }
    },
    {}
  );

  const inputSchema = z.object(
    // need a way to figure out how to change z.ZodTypeAny to something more specific
    builtInputSchema as Record<string, z.ZodTypeAny>
  );

  type Input = z.infer<typeof inputSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<Input>({
    mode: "all",
    resolver: zodResolver(inputSchema)
  });

  // eslint-disable-next-line no-console
  const processForm = (data: unknown) => console.log(data);
  // eslint-disable-next-line no-console
  const onInvalid = (errors: unknown) => console.error(errors);

  return (
    <Container maxWidth="lg">
      <form onSubmit={handleSubmit(processForm, onInvalid)}>
        <Stack spacing={2} maxWidth={"500px"} mt={theme.spacing(2)}>
          {formBuilderObject.pages[0].elements.map((element, elementIndex) => {
            return (
              <SurveyBlock key={elementIndex}>
                {element.type === "checkbox" &&
                  element.name &&
                  typeof element.name === "string" && (
                    <FormCheckbox
                      control={control}
                      name={element.name}
                      title={element.title || ""}
                      choices={element.choices || []}
                    />
                  )}
                {element.type === "textField" &&
                  element.name &&
                  typeof element.name === "string" && (
                    <FormTextField
                      control={control}
                      name={element.name}
                      title={element.title || ""}
                      errors={errors}
                    />
                  )}
              </SurveyBlock>
            );
          })}
        </Stack>
      </form>
    </Container>
  );
}

export default App;
