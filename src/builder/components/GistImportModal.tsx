import * as React from "react";
import {
  Modal,
  Button,
  Form,
  FormGroup,
  TextInput,
} from "@patternfly/react-core";

const Gists = require("gists");
const gists = new Gists({
  token: "",
});

export const GistImportModal = ({ isOpen, onClose, setCode }) => {
  const [loaded, setLoaded] = React.useState(false);
  const [isImporting, setIsImporting] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [error, setError] = React.useState("");

  const getGists = () => {
    gists
      .list("pf-ui-builder")
      .then((res) => {
        console.log(res.body);
      })
      .catch(console.error);
  };

  const getGist = (id: string) => {
    let checkedId = id;
    if (checkedId) {
      if (checkedId.search("/")) {
        checkedId = checkedId.split("/").slice(-1)[0];
      }
      gists
        .get(checkedId)
        .then((res) => {
          console.log(res.body);
          setIsImporting(false);
          setLoaded(true);
          setCode(res.body.files["NewComponent"].content);
        })
        .catch((err) => {
          setIsImporting(false);
          setLoaded(true);
          setError(err.toString());
        });
    }
  };

  const onPrimaryAction = () => {
    if (!loaded) {
      setIsImporting(true);
      getGist(description);
    } else {
      onClose();
    }
  };

  const getButtonText = () => {
    if (isImporting) {
      return "Importing ...";
    }
    if (!loaded) {
      return "Import";
    }
    return "Close";
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant="medium"
      appendTo={() => document.body}
      title="Import from gist"
      actions={[
        <Button
          variant="primary"
          onClick={onPrimaryAction}
          isDisabled={isImporting || !description}
        >
          {getButtonText()}
        </Button>,
      ]}
    >
      {!loaded ? (
        <Form>
          <FormGroup
            label="Gist URL"
            fieldId="description"
            helperText="Example: https://gist.github.com/pf-ui-builder/a0b3810763fab59ae50ff1d55c30d7ba"
          >
            <TextInput
              isRequired
              type="text"
              value={description}
              onChange={setDescription}
              id="gist-description"
            />
          </FormGroup>
        </Form>
      ) : (
        <div>{error || "Import successful!"}</div>
      )}
    </Modal>
  );
};
