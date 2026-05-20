import Tree from "react-d3-tree";

interface FamilyNode {
  name: string;
  attributes?: {
    age?: string;
    relation?: string;
    photo?: string;
  };
  children?: FamilyNode[];
}

const sampleFamilyData: FamilyNode = {
  name: "John Doe",
  attributes: {
    age: "45",
    relation: "You",
    photo: "/api/placeholder/100/100",
  },
  children: [
    {
      name: "Jane Doe",
      attributes: {
        age: "43",
        relation: "Spouse",
        photo: "/api/placeholder/100/100",
      },
      children: [
        {
          name: "Emma Doe",
          attributes: {
            age: "18",
            relation: "Daughter",
            photo: "/api/placeholder/100/100",
          },
        },
        {
          name: "Michael Doe",
          attributes: {
            age: "15",
            relation: "Son",
            photo: "/api/placeholder/100/100",
          },
        },
      ],
    },
    {
      name: "Robert Doe",
      attributes: {
        age: "72",
        relation: "Father",
        photo: "/api/placeholder/100/100",
      },
      children: [
        {
          name: "Mary Doe",
          attributes: {
            age: "70",
            relation: "Mother",
            photo: "/api/placeholder/100/100",
          },
        },
      ],
    },
  ],
};

interface FamilyTreeProps {
  data?: FamilyNode;
}

const renderCustomNode = ({ nodeDatum }: any) => (
  <g>
    {/* Node circle background */}
    <circle r={40} fill="#F8F4F0" stroke="#D97757" strokeWidth={3} />

    {/* Photo placeholder */}
    <circle r={35} fill="#2F2F2F" cx={0} cy={-10} />

    {/* Name */}
    <text
      fill="#2F2F2F"
      x={0}
      y={25}
      textAnchor="middle"
      fontSize="12"
      fontFamily="Inter, sans-serif"
      fontWeight="600"
    >
      {nodeDatum.name}
    </text>

    {/* Age/Relation */}
    <text
      fill="#2F2F2F"
      x={0}
      y={40}
      textAnchor="middle"
      fontSize="10"
      fontFamily="Inter, sans-serif"
      opacity={0.7}
    >
      {nodeDatum.attributes?.age} • {nodeDatum.attributes?.relation}
    </text>
  </g>
);

export default function FamilyTree({
  data = sampleFamilyData,
}: FamilyTreeProps) {
  return (
    <div className="w-full h-96 bg-warm-beige rounded-lg overflow-hidden">
      <Tree
        data={data}
        orientation="vertical"
        pathFunc="step"
        translate={{ x: 400, y: 50 }}
        nodeSize={{ x: 120, y: 120 }}
        separation={{ siblings: 1.5, nonSiblings: 2 }}
        renderCustomNodeElement={renderCustomNode}
        pathClassFunc={() => "stroke-terracotta stroke-2 fill-none"}
        zoomable={true}
        draggable={true}
        collapsible={false}
        onNodeClick={(node) => {
          console.log("Node clicked:", node);
          // TODO: Open profile modal
        }}
      />
    </div>
  );
}
