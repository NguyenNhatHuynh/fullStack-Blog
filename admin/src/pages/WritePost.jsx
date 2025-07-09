import {
  Button,
  Select,
  TextInput,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import useStore from "../store";
import { createSlug, uploadImage } from "../utils"; // 👈 dùng đúng hàm upload ảnh

import { Link, RichTextEditor } from "@mantine/tiptap";
import { IconColorPicker } from "@tabler/icons-react";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { BubbleMenu, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { BiImages } from "react-icons/bi";
import { Toaster, toast } from "sonner";
import Loading from "../components/Loading";
import { useCreatePost } from "../hooks/post-hook";

const WritePost = () => {
  const { colorScheme } = useMantineColorScheme();
  const theme = colorScheme === "dark";

  const { user } = useStore();
  const [visible, { toggle }] = useDisclosure(false);
  const { isPending, mutate } = useCreatePost(toast, toggle, user?.token);

  const [category, setCategory] = useState("NEWS");
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [title, setTitle] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Write post here..." }),
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextStyle,
      Color,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
  });

  const handleSubmit = () => {
    if (!fileURL || !category || !title) {
      toast.error("All fields are required");
      return;
    }

    const slug = createSlug(title);

    mutate({
      title,
      slug,
      cat: category,
      img: fileURL,
      desc: editor?.getHTML(),
    });
  };

  useEffect(() => {
    const uploadPostImage = async () => {
      try {
        const url = await uploadImage(file);
        setFileURL(url);
        toast.success("Image uploaded successfully!");
      } catch (err) {
        toast.error(err.message || "Image upload failed");
        setFile(null);
      }
    };

    if (file) uploadPostImage();
  }, [file]);

  return (
    <>
      <RichTextEditor editor={editor}>
        <div className='w-full flex flex-col md:flex-row flex-wrap gap-5 mb-8'>
          <TextInput
            withAsterisk
            label='Post title'
            className='w-full flex-1'
            placeholder='Post title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Select
            label='Category'
            defaultValue={"NEWS"}
            placeholder='Pick Category'
            data={["NEWS", "SPORTS", "CODING", "EDUCATION", "FASHION"]}
            onChange={(val) => setCategory(val)}
          />

          <label
            className='flex items-center gap-1 text-base cursor-pointer'
            htmlFor='imgUpload'
          >
            <input
              type='file'
              onChange={(e) => setFile(e.target.files[0])}
              className='hidden'
              id='imgUpload'
              accept='.jpg, .png, .jpeg'
              data-max-size='5120'
            />
            <BiImages />
            <span>Post Image</span>
          </label>

          {fileURL && (
            <div className='mt-2'>
              <img
                src={fileURL}
                alt='Post Preview'
                className='w-28 h-28 object-cover rounded-md'
              />
            </div>
          )}
        </div>

        {editor && (
          <BubbleMenu editor={editor}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Link />
            </RichTextEditor.ControlsGroup>
          </BubbleMenu>
        )}

        <RichTextEditor.Toolbar sticky stickyOffset={20}>
          <RichTextEditor.ColorPicker
            colors={[
              "#fa5252",
              "#4c6ef5",
              "#37B24D",
              "#fab005",
              "#868e96",
              "#15aabf",
            ]}
          />
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content className='py-6' />
      </RichTextEditor>

      <div className='flex justify-end mt-6'>
        <Button
          className={theme ? "bg-blue-600" : "bg-black"}
          onClick={handleSubmit}
        >
          Submit Post
        </Button>
      </div>

      <Loading visible={isPending} />
      <Toaster richColors />
    </>
  );
};

export default WritePost;
