import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Utility } from "../../../utils/Utility";
// import { Utility } from "../../../utils/Utility";
// import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";

interface EditorProps {
  value: string;
  onChange: (content: string) => void;
}

function RichTextEditor(props: EditorProps) {
  const { value, onChange } = props;
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
  const editorRef = useRef<any>(null);

  const handleEditorChange = (content: string) => {
    onChange(content);
  };

  const imageUploadHandler = (blobInfo: any, progress: any) =>
    new Promise((resolve, reject) => {
      // In case which the max file size is 1Mb
      if (
        Utility.getKbFromBytes(blobInfo.blob().size) >
        Number(process.env.REACT_APP_IMAGE_SIZE_LIMIT)
      ) {
        return reject({
          message: "Image size exceeds the maximum allowed size of 1 MB.",
          remove: true,
        });
      }
      const reader: any = new FileReader();
      reader.onload = function (e: any) {
        const img = new Image();
        img.onload = function () {
          resolve(reader.result);
        };
        img.onerror = function () {
          reject("Error loading image.");
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(blobInfo.blob());
    });

  const editorConfig: any = {
    branding: false,
    menubar: false,
    plugins: "image link media anchor advlist lists autoresize",
    toolbar:
      "autoresize | lineheight | fontsize | fontselect | fontfamily | formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | link image media | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat | myimage ",
    media_live_embeds: true,
    statusbar: false,
    content_style:
      "body{overflow:auto !important} " +
      "html{overflow:auto !important} " +
      "::-webkit-scrollbar { width: 4px; height: 4px;} " +
      "::-webkit-scrollbar-track { background: var(--scrollbar-track-bg);background: transparent;} " +
      "::-webkit-scrollbar-thumb {border-radius: 6px;background: var(--scrollbar-thumb-bg);background: rgba(184, 203, 209, 0.7);} " +
      ".ephox-snooker-resizer-bar{display:none !important}",
    images_upload_handler: imageUploadHandler,
    font_family_formats:
      "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
    fontsize_formats: "8 9 10 11 12 14 18 24 30 36 48 60 72 96",
    line_height_formats: "1 1.15 1.5 2 2.5 3",
  };

  return (
    <>
      <Editor
        onInit={(e: any, editor: any) => (editorRef.current = editor)}
        apiKey={"7vlhwr4y5q9knnnjvmoyzl9zdy5owumlws0q88ntw2ndonad"}
        value={value}
        onEditorChange={handleEditorChange}
        init={editorConfig}
      />
      {/* <ConfirmationDialog
        open={openConfirmation}
        message={"Image size exceeds the maximum allowed size of 1 MB."}
        onOk={() => {
          setOpenConfirmation(false);
        }}
      /> */}
    </>
  );
}

export default RichTextEditor;
