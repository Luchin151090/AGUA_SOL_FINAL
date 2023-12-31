import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';

class Pedido extends StatefulWidget {
  const Pedido({super.key});

  @override
  State<Pedido> createState() => _PedidoState();
}

class _PedidoState extends State<Pedido> {
  @override
  Widget build(BuildContext context) {
    //final TabController _tabController = TabController(length: 2, vsync: this);

    return Scaffold(
        body: SafeArea(
            child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  //mainAxisAlignment: MainAxisAlignment.end,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      height: 160,
                      margin: const EdgeInsets.only(top: 30,left: 20),
                     // color:Colors.grey,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        //crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            margin: const EdgeInsets.only(left: 20),
                            padding: const EdgeInsets.all(10),
                            height:100 ,
                            width: 130,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(10),
                              image: DecorationImage(
                                fit: BoxFit.cover,
                                image: AssetImage('lib/imagenes/mañana.png')
                              ),
                              color:Color.fromARGB(255, 24, 157, 104)
                            ),
                          ),
                          //Expanded(child: Container()),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.end,
                            mainAxisAlignment: MainAxisAlignment.start,
                            children: [

                              Container(
                                margin: const EdgeInsets.only(right: 20),
                                //color: Colors.blue,
                                child: Text("Tu pedido",
                                style: 
                                TextStyle(color:const Color.fromARGB(255, 17, 62, 98),
                                fontSize: 30,fontWeight:FontWeight.w300),)),
                              Container(
                                margin: const EdgeInsets.only(right: 20),
                            child: Text("se agendó",
                            style: TextStyle(fontSize: 28,color: const Color.fromARGB(255, 3, 39, 68)),),
                          ),
                          Container(
                            margin: const EdgeInsets.only(right:20),
                            child:Text("para mañana",
                            style: TextStyle(fontSize: 25,fontWeight: FontWeight.w200),),
                          ),
                          Container(
                            margin: const EdgeInsets.only(right:20),
                            child:Text("aquí esta el detalle",
                            style: TextStyle(fontSize: 20,
                            fontWeight: FontWeight.w400),),
                          ),
                            ],
                          ),
                                                  
                        ],
                      ),
                    ),
                    
                    const SizedBox(height: 20,),
                    Container(
                      margin: const EdgeInsets.only(left: 20,right: 20),
                    //  color:Colors.grey,

                      height: 200,
                      decoration: BoxDecoration(
                        //color:Color.fromARGB(255, 83, 231, 147),
                        
                        borderRadius: BorderRadius.circular(20),
                            border: Border.all(width: 4,color: Color.fromARGB(255, 218, 222, 3))
                            
                          ),
                      child: ListView.builder(
                        itemCount: 8,
                        itemBuilder:(context,index){
                        return Container(
                          margin: const EdgeInsets.only(left: 20),
                          child:const Row(
                            children: [
                              Icon(Icons.water_drop_outlined,
                              color:Color.fromARGB(255, 2, 77, 138),size: 40,),
                              const SizedBox(width: 50,),
                              Text("Bidón 20L cantidad: 3",
                              style: TextStyle(fontSize: 20,color:const Color.fromARGB(255, 1, 75, 135)),),
                            ],
                          ),
                        );
                      }),
                    ),

                    const SizedBox(height: 20,),
                    Container(
                      margin: const EdgeInsets.only(left: 20),
                      //color:Colors.grey,
                      height: 50,
                      child: Text("El total es de: S/.200.00",
                      style:TextStyle(color: Color.fromARGB(255, 0, 70, 123),fontSize: 28,fontWeight: FontWeight.w500),),

                    ),
                    Container(
                      margin: const EdgeInsets.only(left: 20),
                      height: 60,
                      //color:Colors.grey,
                      width: 140,
                      child: ElevatedButton(onPressed: (){},
                       child: Text("Listo !",
                       style: TextStyle(fontSize: 25,color:Colors.white),),
                      style: ButtonStyle(
                        backgroundColor: MaterialStateProperty.all(Color.fromARGB(255, 0, 68, 120))
                      ),
                       ),

                    ),
                    const SizedBox(height: 20,),
                    Container(
                      margin: const EdgeInsets.only(left: 20),
                      child: Text("Lo necesitas",
                      style: TextStyle(fontSize: 40,fontWeight: FontWeight.w300),),
                    ),
                     Container(
                      margin: const EdgeInsets.only(left: 20),
                      child: Text("HOY ?",style: TextStyle(fontSize: 40),),
                    ),
                    Container(
                      margin: const EdgeInsets.only(left: 20),
                      child: Row(
                        children: [
                          Container(
                            height: 60,
                            width: 60,
                            decoration: BoxDecoration(
                               color:Colors.amber,
                               borderRadius: BorderRadius.circular(15)
                            ),
                            child:Lottie.asset('lib/imagenes/anim_13.json'),

                            ),
                          Text(" + S/.10 conviértelo en Pedido express",
                          style: TextStyle(fontSize: 20),),
                        ],
                      ),
                    ),
                    const SizedBox(height: 15,),
                    Container(
                      margin: const EdgeInsets.only(left: 20),
                      height: 60,
                      //color:Colors.grey,
                      width: 180,
                      child: ElevatedButton(onPressed: (){},
                       child: Text("Express >>",
                       style: TextStyle(fontSize: 25,color:Color.fromARGB(255, 2, 78, 140)),),
                      style: ButtonStyle(
                        backgroundColor: MaterialStateProperty.all(const Color.fromARGB(255, 219, 214, 214))
                      ),
                       ),

                    ),
                    
                  
                  ],
                ))));
  }
}
