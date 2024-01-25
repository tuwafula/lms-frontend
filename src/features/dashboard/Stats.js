import { useQuery } from "@tanstack/react-query";

import Stat from "./Stat";
import { getBooks } from "../../services/apiBooks";
import { getTransactions } from "../../services/apiTransactions";
import {
  HiOutlineArchiveBox,
  HiOutlineBookOpen,
  HiOutlineCurrencyDollar,
} from "react-icons/hi2";
import Spinner from "../../ui/Spinner";

function Stats() {
  const { data: books, isLoading: isFetchingBooks } = useQuery({
    queryKey: ["books"],
    queryFn: () => getBooks(),
  });

  const { data: transactions, isLoading: isFetchingTransactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  if (isFetchingBooks || isFetchingTransactions) return <Spinner />;

  const totalStock = books.reduce((acc, cur) => acc + cur.stock, 0);

  const numOfDiverseBooks = books.length;

  const returnedTransactions = transactions.filter(
    (transaction) => transaction.is_returned === true
  );

  const settledTransactions = returnedTransactions.length;
  return (
    <>
      <Stat
        title="Total Book Stock"
        color="blue"
        icon={<HiOutlineArchiveBox />}
        value={totalStock}
      />
      <Stat
        title="Number of diverse books"
        color="yellow"
        icon={<HiOutlineBookOpen />}
        value={numOfDiverseBooks}
      />
      <Stat
        title="Settled Transactions"
        color="green"
        icon={<HiOutlineCurrencyDollar />}
        value={settledTransactions}
      />
    </>
  );
}

export default Stats;
