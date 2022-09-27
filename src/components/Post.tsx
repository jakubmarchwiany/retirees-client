import { ExpandMore } from "@mui/icons-material";
import {
  Button,
  CardHeader,
  Collapse,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // import plugin
import parse from "html-react-parser";
import { useState } from "react";
import { ExpandMoreIcon } from "./my/ExpandMore";
import { PostType } from "./post.interface";
dayjs.extend(relativeTime);

const POST_IMAGE_PATH = process.env.NEXT_PUBLIC_POST_IMAGE_PATH;

type Props = {
  post: PostType;
};

function Post({ post }: Props) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const subheader = () => {
    if (post.isTrip)
      return `Data wyjazdu: ${dayjs(post.startDate).format(
        "DD.MM.YYYY"
      )} - ${dayjs(post.endDate).format("DD.MM.YYYY")} (${dayjs(
        post.startDate
      ).fromNow()})`;
    else return `Data: ${dayjs(post.startDate).format("DD.MM.YYYY")}`;
  };

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: "1%",
        backgroundColor: "background.default",
        boxShadow: 15,
      }}
    >
      <CardHeader
        title={
          <Typography sx={{ typography: { xs: "h6", sm: "h4" } }}>
            {post.title}
          </Typography>
        }
        subheader={
          <Typography
            sx={{ typography: { xs: "caption", sm: "h6" } }}
            alignContent={"center"}
          >
            {subheader()}
          </Typography>
        }
      />
      <Divider />

      {post.isTrip && (
        <>
          <CardMedia
            component="img"
            image={POST_IMAGE_PATH + post.imageID}
            sx={{ objectFit: "contain", minWidth: "100%" }}
          />
          <Divider />
        </>
      )}

      <Stack
        component={Button}
        fullWidth
        direction={"row"}
        justifyContent="center"
        onClick={handleExpandClick}
      >
        <ExpandMoreIcon
          expand={expanded}
          aria-expanded={expanded}
          aria-label="show more"
          sx={{ height: "32px" }}
        >
          <ExpandMore />
        </ExpandMoreIcon>

        <Typography variant="h6" alignContent={"center"}>
          Więcej informacji
        </Typography>
        <ExpandMoreIcon
          expand={expanded}
          aria-expanded={expanded}
          aria-label="show more"
          sx={{ height: "32px" }}
        >
          <ExpandMore />
        </ExpandMoreIcon>
      </Stack>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ mx: "2%", my: "2%" }}>
          {parse(post.content)}
        </CardContent>
      </Collapse>
    </Card>
  );
}
export default Post;
