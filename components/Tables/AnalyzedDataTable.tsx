import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export function AnalyzedDataTable({ data }: { data: any }) {
  return (
    <Table className="overflow-auto text-[14px]">
      <TableCaption>A list of all the Analyzed Products.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[110px]">Product Name</TableHead>
          <TableHead className="w-[110px]">Target Region</TableHead>
          <TableHead className="w-[110px]">Sizes Available</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="w-[130px]">Product made of</TableHead>
          <TableHead>Shipping Information</TableHead>
          <TableHead className="w-[240px]">Product Description</TableHead>
          <TableHead>Reviews</TableHead>
          <TableHead className="w-[100px]">Product URL</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item: any, index: number) => (
          <TableRow key={index}>
            <TableCell>{item["Product Name"]}</TableCell>
            <TableCell>{item["Target region"]}</TableCell>
            <TableCell>{item["Sizes Available"]}</TableCell>
            <TableCell>{item["Price"]}</TableCell>
            <TableCell>{item["Product made of"]}</TableCell>
            <TableCell>{item["Shipping Information"]}</TableCell>
            <TableCell>{item["Product Description"]}</TableCell>
            <TableCell>{item["Reviews"]}</TableCell>
            <TableCell>
              <Link
                href={item["Product page URL"]}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Product
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
