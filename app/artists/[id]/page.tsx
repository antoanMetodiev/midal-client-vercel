import ArtistDetails from "@/components/ArtistDetails/ArtistDetails";

const ArtistDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    return (
        <ArtistDetails id={Array.isArray(id) ? id[0] : id ?? ""} />
    );
};

export default ArtistDetailsPage;