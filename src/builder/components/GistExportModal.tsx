import * as React from "react";
import {
  Modal,
  Button,
  Form,
  FormGroup,
  TextInput,
  ClipboardCopy,
  ClipboardCopyAction,
  Tooltip,
  Spinner,
} from "@patternfly/react-core";
import ExternalLinkAltIcon from "@patternfly/react-icons/dist/esm/icons/external-link-alt-icon";

const Gists = require("gists");
const gists = new Gists({
  token: "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",
});

export const GistExportModal = ({ code, isOpen, onClose }) => {
  const [gistUrl, setGistUrl] = React.useState("");
  const [isCreating, setIsCreating] = React.useState(false);
  const [description, setDescription] = React.useState("");
  const [error, setError] = React.useState("");

  const createGist = (description) => {
    const options = {
      accept: "application/vnd.github.v3+json",
      description: description || "pf-ui-builder gist",
      public: true,
      files: {
        NewComponent: {
          content: code,
        },
      },
    };
    gists
      .create(options)
      .then((res) => {
        console.log(res.body);
        setGistUrl(res.body.html_url);
        setIsCreating(false);
      })
      .catch((err) => {
        setIsCreating(false);
        setError(err.toString());
      });
  };

  const getGists = () => {
    gists
      .list("pf-ui-builder")
      .then((res) => {
        console.log(res.body);
      })
      .catch(console.error);
  };

  const getGist = (id: string) => {
    if (id) {
      gists
        .get(id)
        .then((res) => {
          console.log(res.body);
        })
        .catch(console.error);
    }
  };

  const onPrimaryAction = () => {
    if (!gistUrl) {
      setIsCreating(true);
      createGist(description);
    } else {
      onClose();
    }
  };

  const getButtonText = () => {
    if (isCreating) {
      return "Creating ...";
    }
    if (!gistUrl) {
      return "Create";
    }
    return "Close";
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant="medium"
      appendTo={() => document.body}
      title="Create gist"
      actions={[
        <Button
          variant="primary"
          onClick={onPrimaryAction}
          isDisabled={isCreating || !description}
        >
          {getButtonText()}
        </Button>,
      ]}
    >
      {!gistUrl ? (
        <Form>
          <FormGroup label="Description" fieldId="description" helperText="Note: Gists will be routinely deleted and are not permanent">
            <TextInput
              isRequired
              type="text"
              value={description}
              onChange={setDescription}
              id="gist-description"
            />
          </FormGroup>
        </Form>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <ClipboardCopy
            variant="inline-compact"
            additionalActions={
              <ClipboardCopyAction>
                <Tooltip
                  trigger="mouseenter"
                  content="Open URL"
                  exitDelay={300}
                  entryDelay={300}
                  position="bottom"
                >
                  <Button
                    variant="plain"
                    aria-label="Open new browser tab"
                    onClick={() => window.open(gistUrl)}
                  >
                    <ExternalLinkAltIcon aria-hidden />
                  </Button>
                </Tooltip>
              </ClipboardCopyAction>
            }
          >
            {gistUrl}
          </ClipboardCopy>
        </div>
      )}
    </Modal>
  );
};
