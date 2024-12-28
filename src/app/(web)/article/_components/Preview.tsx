import { Card, Text } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import techIcons from "@/app/(web)/_helper/tagToImage";
import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";
const Preview = ({ tag, title, subtitle, id, createdAt }: { tag: string, title: string, subtitle: string, id: string, createdAt: string; }) => {
  return (
    <Card.Root width={{
      base: "100%",
      sm: "calc(50% - 16px)",
      lg: "calc(33% - 16px)"
    }}
      variant='elevated' className="bg-bg-main">
      <Card.Body gap="2">
        <Avatar
          src={techIcons[tag.toLowerCase() as keyof typeof techIcons]}
          name={tag}
          size="lg"
          shape="rounded"
        />
        <Card.Title mt="2">{title}</Card.Title>
        <Card.Description>
          {subtitle}
        </Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="space-between">
        <Text fontSize="sm" color="gray.500">created at :{createdAt.split('T')[0]}</Text>
        <Button fontWeight="bold" variant="outline" colorPalette="teal" ><Link href={`/article/${id}`}>View</Link><RiArrowRightLine /></Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default Preview;
