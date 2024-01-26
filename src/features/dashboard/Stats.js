import { useQuery } from "@tanstack/react-query";

import Stat from "./Stat";
import { getBooks } from "../../services/apiBooks";
import { getTransactions } from "../../services/apiTransactions";
import {
  HiOutlineArchiveBox,
  HiOutlineBookOpen,
  HiOutlineCurrencyDollar,
  HiOutlineUsers,
  HiOutlineWallet,
} from "react-icons/hi2";
import Spinner from "../../ui/Spinner";
import { getMembers } from "../../services/apiMembers";

function Stats() {
  const { data: books, isLoading: isFetchingBooks } = useQuery({
    queryKey: ["books"],
    queryFn: () => getBooks(),
  });

  const { data: transactions, isLoading: isFetchingTransactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  const { data: members, isLoading: isFetchingMembers } = useQuery({
    queryKey: ["members"],
    queryFn: () => getMembers(),
  });

  if (isFetchingBooks || isFetchingTransactions || isFetchingMembers)
    return <Spinner />;

  const totalStock = books.reduce((acc, cur) => acc + cur.stock, 0);

  const allMembers = members.length;

  const numOfDiverseBooks = books.length;

  const totalTransactions = transactions.length;

  const returnedTransactions = transactions.filter(
    (transaction) => transaction.is_returned === true
  );

  const settledTransactions = returnedTransactions.length;

  const unreturnedTransactions = transactions.filter(
    (transaction) => transaction.is_returned === false
  );

  const unsettledTransactions = unreturnedTransactions.length;

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
      <Stat
        title="Total library members"
        color="blue"
        icon={<HiOutlineUsers />}
        value={allMembers}
      />
      <Stat
        title="Transactions count"
        color="yellow"
        icon={<HiOutlineWallet />}
        value={totalTransactions}
      />
      <Stat
        title="Unsettled Transactions"
        color="green"
        icon={<HiOutlineCurrencyDollar />}
        value={unsettledTransactions}
      />
    </>
  );
}

export default Stats;
